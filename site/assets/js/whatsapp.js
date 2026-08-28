// WhatsApp checkout — the site has no payment gateway, orders are placed by
// sending the cart + delivery details straight to the brand's WhatsApp number.
window.IrisPharma = window.IrisPharma || {};

(function () {
  // wa.me lands on a WhatsApp web page first, which shows an "Open in app?"
  // banner instead of switching straight to the app. The whatsapp:// scheme
  // opens the installed app directly, so prefer it on mobile where the app is
  // actually installed; desktop has no app to hand off to, so keep wa.me there.
  function buildWhatsAppUrl(message) {
    const text = encodeURIComponent(message);
    const number = window.IrisPharma.site.whatsappNumber;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    return isMobile
      ? `whatsapp://send?phone=${number}&text=${text}`
      : `https://wa.me/${number}?text=${text}`;
  }

  function buildOrderMessage(order) {
    const { brandName } = window.IrisPharma.site;
    return [
      `New order — ${brandName}`,
      ``,
      ...order.items.map(
        ({ product, qty }) => `${product.name} × ${qty} — ₹${product.price * qty}`
      ),
      ``,
      ...(order.promo ? [`Promo code (${order.promo.code}): −₹${order.promo.discount}`] : []),
      `Total: ₹${order.total}`,
      ``,
      `Name: ${order.name}`,
      `Phone: ${order.phone}`,
      `Address: ${order.address}`,
      ``,
      order.paymentStatus === "paid"
        ? `Payment: Paid online via Razorpay (${order.razorpayPaymentId || "—"})`
        : `Payment: To be confirmed on WhatsApp`,
    ].join("\n");
  }

  window.IrisPharma.whatsapp = { buildWhatsAppUrl, buildOrderMessage };
})();
