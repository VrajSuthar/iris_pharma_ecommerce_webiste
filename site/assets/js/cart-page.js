// cart.html — page-specific behavior: render cart lines + order summary.
(function () {
  function lineHtml(item) {
    const { product, qty } = item;
    return `
      <article class="cart-line" data-cart-line="${product.slug}">
        <a href="/products/${product.slug}.html" class="cart-line__media">
          <img src="${product.image}" alt="${product.name}" />
        </a>
        <div class="cart-line__body">
          <a href="/products/${product.slug}.html" class="cart-line__name">${product.name}</a>
          <span class="cart-line__category">${product.category}</span>
          <div class="cart-line__qty-row">
            <div class="qty-stepper">
              <button type="button" data-cart-qty-minus="${product.slug}" aria-label="Decrease quantity">−</button>
              <span>${qty}</span>
              <button type="button" data-cart-qty-plus="${product.slug}" aria-label="Increase quantity">+</button>
            </div>
            <button type="button" class="cart-line__remove" data-cart-remove="${product.slug}">Remove</button>
          </div>
        </div>
        <div class="cart-line__price">₹${product.price * qty}</div>
      </article>
    `;
  }

  function render() {
    const items = window.IrisPharma.cart.getItems();
    const emptyEl = document.querySelector("[data-cart-empty]");
    const layoutEl = document.querySelector("[data-cart-layout]");
    if (!emptyEl || !layoutEl) return;

    if (items.length === 0) {
      emptyEl.hidden = false;
      layoutEl.hidden = true;
      return;
    }

    emptyEl.hidden = true;
    layoutEl.hidden = false;

    document.querySelector("[data-cart-lines]").innerHTML = items.map(lineHtml).join("");

    const subtotal = window.IrisPharma.cart.getSubtotal();
    const mrpTotal = window.IrisPharma.cart.getMrpSubtotal();
    document.querySelector("[data-cart-subtotal]").textContent = `₹${subtotal}`;
    document.querySelector("[data-cart-mrp]").textContent = `₹${mrpTotal}`;
    document.querySelector("[data-cart-savings]").textContent = `₹${mrpTotal - subtotal}`;

    renderPromo(subtotal);
  }

  function renderPromo(subtotal) {
    const code = window.IrisPharma.cart.getPromoCode();
    const result = window.IrisPharma.applyPromo(subtotal, code);

    const appliedEl = document.querySelector("[data-promo-applied]");
    const formEl = document.querySelector("[data-promo-form]");
    const errorEl = document.querySelector("[data-promo-error]");

    if (result.valid) {
      appliedEl.hidden = false;
      formEl.hidden = true;
      document.querySelector("[data-promo-code-label]").textContent = result.code;
      document.querySelector("[data-promo-discount]").textContent = `−₹${result.discount}`;
    } else {
      appliedEl.hidden = true;
      formEl.hidden = false;
      // A stored code that no longer matches a known promo (or the code
      // was simply never set) — nothing to show, just don't apply a discount.
      if (code) window.IrisPharma.cart.clearPromoCode();
    }

    if (errorEl && !result.valid && !code) errorEl.hidden = true;

    document.querySelector("[data-cart-total]").textContent = `₹${result.total}`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    render();

    document.addEventListener("click", (e) => {
      const minus = e.target.closest("[data-cart-qty-minus]");
      const plus = e.target.closest("[data-cart-qty-plus]");
      const remove = e.target.closest("[data-cart-remove]");
      const removePromo = e.target.closest("[data-promo-remove]");

      if (minus) {
        const slug = minus.getAttribute("data-cart-qty-minus");
        const item = window.IrisPharma.cart.getItems().find((i) => i.product.slug === slug);
        if (item) window.IrisPharma.cart.setQty(slug, item.qty - 1);
        render();
      } else if (plus) {
        const slug = plus.getAttribute("data-cart-qty-plus");
        const item = window.IrisPharma.cart.getItems().find((i) => i.product.slug === slug);
        if (item) window.IrisPharma.cart.setQty(slug, item.qty + 1);
        render();
      } else if (remove) {
        const slug = remove.getAttribute("data-cart-remove");
        window.IrisPharma.cart.removeItem(slug);
        window.IrisPharma.toast("Removed from cart");
        render();
      } else if (removePromo) {
        window.IrisPharma.cart.clearPromoCode();
        window.IrisPharma.toast("Promo code removed");
        render();
      }
    });

    document.addEventListener("submit", (e) => {
      const form = e.target.closest("[data-promo-form]");
      if (!form) return;
      e.preventDefault();

      const input = form.querySelector("[data-promo-input]");
      const code = input.value.trim();
      const errorEl = document.querySelector("[data-promo-error]");
      const subtotal = window.IrisPharma.cart.getSubtotal();
      const result = window.IrisPharma.applyPromo(subtotal, code);

      if (!code) return;

      if (result.valid) {
        window.IrisPharma.cart.setPromoCode(code);
        errorEl.hidden = true;
        input.value = "";
        window.IrisPharma.toast(`Promo code applied — ${result.label}`);
        render();
      } else {
        errorEl.textContent = "That promo code isn't valid.";
        errorEl.hidden = false;
      }
    });
  });
})();
