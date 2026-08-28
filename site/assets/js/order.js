// order.html — page-specific behavior: order summary, promo code, and the
// WhatsApp handoff.
(function () {
  function currentPromoResult() {
    const subtotal = window.IrisPharma.cart.getSubtotal();
    return window.IrisPharma.applyPromo(subtotal, window.IrisPharma.cart.getPromoCode());
  }

  function renderPromo(subtotal) {
    const result = window.IrisPharma.applyPromo(subtotal, window.IrisPharma.cart.getPromoCode());

    const appliedEl = document.querySelector("[data-promo-applied]");
    const formEl = document.querySelector("[data-promo-form]");
    const errorEl = document.querySelector("[data-promo-error]");
    if (!appliedEl || !formEl) return result;

    if (result.valid) {
      appliedEl.hidden = false;
      formEl.hidden = true;
      document.querySelector("[data-promo-code-label]").textContent = result.code;
      document.querySelector("[data-promo-discount]").textContent = `−₹${result.discount}`;
    } else {
      appliedEl.hidden = true;
      formEl.hidden = false;
      if (window.IrisPharma.cart.getPromoCode()) window.IrisPharma.cart.clearPromoCode();
    }

    if (errorEl) errorEl.hidden = true;
    return result;
  }

  function renderSummary() {
    const items = window.IrisPharma.cart.getItems();
    const emptyEl = document.querySelector("[data-order-empty]");
    const layoutEl = document.querySelector("[data-order-layout]");
    if (!emptyEl || !layoutEl) return;

    if (items.length === 0) {
      emptyEl.hidden = false;
      layoutEl.hidden = true;
      return;
    }

    emptyEl.hidden = true;
    layoutEl.hidden = false;

    document.querySelector("[data-order-lines]").innerHTML = items
      .map(
        ({ product, qty }) => `
          <div class="cart-summary__row">
            <span>${product.name} × ${qty}</span>
            <span>₹${product.price * qty}</span>
          </div>
        `
      )
      .join("");

    const subtotal = window.IrisPharma.cart.getSubtotal();
    document.querySelector("[data-order-subtotal]").textContent = `₹${subtotal}`;
    const result = renderPromo(subtotal);
    document.querySelector("[data-order-total]").textContent = `₹${result.total}`;
    const payAmountEl = document.querySelector("[data-pay-amount]");
    if (payAmountEl) payAmountEl.textContent = `₹${result.total}`;
  }

  // Shared by both the WhatsApp flow and the Razorpay flow — same delivery
  // details, just a different confirmation channel afterwards.
  function getDeliveryDetails(form) {
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const address = form.address.value.trim();
    if (!name || !phone || !address) {
      window.IrisPharma.toast("Please fill in all delivery details");
      return null;
    }
    return { name, phone, address };
  }

  function sendWhatsAppReceipt(details, promo, extra) {
    const items = window.IrisPharma.cart.getItems();
    const order = Object.assign(
      {
        items,
        total: promo.total,
        promo: promo.valid ? promo : null,
      },
      details,
      extra
    );

    const message = window.IrisPharma.whatsapp.buildOrderMessage(order);
    const url = window.IrisPharma.whatsapp.buildWhatsAppUrl(message);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const items = window.IrisPharma.cart.getItems();
    if (items.length === 0) return;

    const details = getDeliveryDetails(e.target);
    if (!details) return;

    sendWhatsAppReceipt(details, currentPromoResult());
    window.IrisPharma.cart.clear();
    window.location.href = "/index.html";
  }

  async function handlePayOnline() {
    const items = window.IrisPharma.cart.getItems();
    if (items.length === 0) return;

    const form = document.querySelector("[data-order-form]");
    const details = getDeliveryDetails(form);
    if (!details) return;

    if (typeof window.Razorpay === "undefined") {
      window.IrisPharma.toast("Payment couldn't load — check your connection and try again.");
      return;
    }

    const payBtn = document.querySelector("[data-pay-online]");
    payBtn.disabled = true;
    payBtn.classList.add("is-loading");

    try {
      const promoCode = window.IrisPharma.cart.getPromoCode();
      const createRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(({ product, qty }) => ({ slug: product.slug, qty })),
          promoCode,
          ...details,
        }),
      });
      const orderData = await createRes.json();

      if (!createRes.ok) {
        window.IrisPharma.toast(orderData.error || "Couldn't start payment. Try again.");
        payBtn.disabled = false;
        payBtn.classList.remove("is-loading");
        return;
      }

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: window.IrisPharma.site.brandName,
        description: "Order payment",
        prefill: { name: details.name, contact: details.phone },
        theme: { color: "#00737c" },
        handler: async (response) => {
          const verifyRes = await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          }).then((r) => r.json());

          if (!verifyRes.verified) {
            window.IrisPharma.toast("Payment could not be verified — please contact us on WhatsApp.");
            payBtn.disabled = false;
            payBtn.classList.remove("is-loading");
            return;
          }

          sendWhatsAppReceipt(details, currentPromoResult(), {
            paymentStatus: "paid",
            razorpayPaymentId: response.razorpay_payment_id,
          });
          window.IrisPharma.cart.clear();
          window.IrisPharma.toast("Payment successful!");
          window.location.href = "/index.html";
        },
        modal: {
          ondismiss: () => {
            payBtn.disabled = false;
            payBtn.classList.remove("is-loading");
          },
        },
      });

      razorpay.on("payment.failed", () => {
        window.IrisPharma.toast("Payment failed — please try again.");
        payBtn.disabled = false;
        payBtn.classList.remove("is-loading");
      });

      razorpay.open();
    } catch (error) {
      console.error(error);
      window.IrisPharma.toast("Something went wrong starting payment. Try again.");
      payBtn.disabled = false;
      payBtn.classList.remove("is-loading");
    }
  }

  function handlePromoSubmit(e) {
    const form = e.target.closest("[data-promo-form]");
    if (!form) return;
    e.preventDefault();

    const input = form.querySelector("[data-promo-input]");
    const code = input.value.trim();
    if (!code) return;

    const subtotal = window.IrisPharma.cart.getSubtotal();
    const result = window.IrisPharma.applyPromo(subtotal, code);
    const errorEl = document.querySelector("[data-promo-error]");

    if (result.valid) {
      window.IrisPharma.cart.setPromoCode(code);
      input.value = "";
      window.IrisPharma.toast(`Promo code applied — ${result.label}`);
      renderSummary();
    } else if (errorEl) {
      errorEl.textContent = "That promo code isn't valid.";
      errorEl.hidden = false;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderSummary();
    document.querySelector("[data-order-form]")?.addEventListener("submit", handleSubmit);

    document.addEventListener("submit", handlePromoSubmit);
    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-promo-remove]")) {
        window.IrisPharma.cart.clearPromoCode();
        window.IrisPharma.toast("Promo code removed");
        renderSummary();
        return;
      }
      if (e.target.closest("[data-pay-online]")) {
        handlePayOnline();
      }
    });
  });
})();
