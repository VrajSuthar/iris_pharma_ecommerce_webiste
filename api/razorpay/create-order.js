// POST /api/razorpay/create-order
// Plain Vercel Function (Node.js runtime, no framework, no SDK) — creates a
// Razorpay order via their REST API directly with fetch + Basic Auth.
//
// Security: only `slug`/`qty` and an optional `promoCode` are trusted from
// the request body. Price and discount are always recomputed here from the
// same catalog/promo modules the browser uses (site/assets/js/data.js and
// promo.js), so a tampered client request can never change what gets
// charged.
const { getProduct } = require("../../site/assets/js/data.js");
const { applyPromo } = require("../../site/assets/js/promo.js");

// Razorpay caps each note value at 256 characters.
function noteValue(value) {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, 256) : undefined;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    res.status(500).json({
      error: "Razorpay isn't configured on this deployment yet (missing RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET).",
    });
    return;
  }

  const body = req.body || {};
  const rawItems = Array.isArray(body.items) ? body.items : [];

  const lines = rawItems
    .map((item) => {
      const slug = item && item.slug;
      const qty = Number(item && item.qty);
      if (typeof slug !== "string" || !Number.isInteger(qty) || qty < 1 || qty > 50) return null;
      const product = getProduct(slug);
      return product ? { product, qty } : null;
    })
    .filter(Boolean);

  if (lines.length === 0) {
    res.status(400).json({ error: "Cart is empty or invalid" });
    return;
  }

  const subtotal = lines.reduce((sum, { product, qty }) => sum + product.price * qty, 0);
  const promo = applyPromo(subtotal, body.promoCode);
  const amountPaise = promo.total * 100;

  if (amountPaise <= 0) {
    res.status(400).json({ error: "Order amount must be greater than zero" });
    return;
  }

  const name = noteValue(body.name);
  const phone = noteValue(body.phone);
  const address = noteValue(body.address);
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  try {
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: "INR",
        receipt: `order_rcpt_${Date.now()}`,
        notes: {
          items: lines
            .map(({ product, qty }) => `${product.name} x${qty}`)
            .join(", ")
            .slice(0, 256),
          ...(promo.valid && { promoCode: promo.code, discount: String(promo.discount) }),
          ...(name && { name }),
          ...(phone && { phone }),
          ...(address && { address }),
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Razorpay create-order failed", data);
      res.status(response.status === 401 ? 401 : 502).json({ error: "Could not create payment order" });
      return;
    }

    res.status(200).json({
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
      keyId,
    });
  } catch (error) {
    console.error("Razorpay create-order failed", error);
    res.status(502).json({ error: "Could not create payment order" });
  }
};
