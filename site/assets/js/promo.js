// Promo codes. Dummy/demo codes only — either a flat amount or a percentage
// off the cart subtotal. Isomorphic like data.js: the browser gets
// `window.IrisPharma.{getPromo,applyPromo}`, and `api/razorpay/create-order.js`
// `require()`s this same file so a discount is always recomputed from this
// one source of truth server-side, never trusted from the client request.
(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.IrisPharma = root.IrisPharma || {};
    Object.assign(root.IrisPharma, factory());
  }
})(typeof window !== "undefined" ? window : globalThis, function () {
  const PROMO_CODES = {
    SAVE10: { type: "flat", amount: 10, label: "₹10 off your order" },
    ADMINVRAJ: { type: "percent", amount: 90, label: "90% off your order" },
  };

  function getPromo(code) {
    if (!code) return null;
    return PROMO_CODES[String(code).trim().toUpperCase()] || null;
  }

  // Never lets a discount take the total below zero.
  function applyPromo(subtotal, code) {
    const promo = getPromo(code);
    let discount = 0;
    if (promo) {
      const raw = promo.type === "percent" ? Math.round((subtotal * promo.amount) / 100) : promo.amount;
      discount = Math.min(raw, subtotal);
    }
    return {
      valid: Boolean(promo),
      code: promo ? String(code).trim().toUpperCase() : null,
      label: promo ? promo.label : null,
      discount,
      total: Math.max(0, subtotal - discount),
    };
  }

  return { PROMO_CODES, getPromo, applyPromo };
});
