// POST /api/razorpay/verify-payment
// Plain Vercel Function (Node.js runtime) — verifies the HMAC-SHA256
// signature Razorpay returns after a successful checkout, using the
// timing-safe comparison Razorpay's docs recommend. Never trust a
// "payment succeeded" callback from the client without this check.
const { createHmac, timingSafeEqual } = require("node:crypto");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body || {};
  const orderId = body.razorpay_order_id;
  const paymentId = body.razorpay_payment_id;
  const signature = body.razorpay_signature;

  if (!orderId || !paymentId || !signature) {
    res.status(400).json({ verified: false });
    return;
  }

  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    console.error("RAZORPAY_KEY_SECRET is not set");
    res.status(500).json({ verified: false });
    return;
  }

  const expected = createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");

  const expectedBuf = Buffer.from(expected, "hex");
  const signatureBuf = Buffer.from(signature, "hex");

  const verified =
    expectedBuf.length === signatureBuf.length && timingSafeEqual(expectedBuf, signatureBuf);

  if (!verified) {
    res.status(400).json({ verified: false });
    return;
  }

  res.status(200).json({ verified: true, paymentId });
};
