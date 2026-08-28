// index.html — page-specific behavior: category tiles + bestseller grid.
(function () {
  const CATEGORIES = [
    { name: "Skin & Fungal Relief", image: "/assets/images/derma-555/poster.jpg" },
    { name: "Face Serum", image: "/assets/images/vitamin-c-serum/poster.jpg" },
    { name: "Herbal Soap & Body Care", image: "/assets/images/stock/turmeric-soap.jpg" },
    { name: "Face Cleanser", image: "/assets/images/stock/skincare-flatlay.jpg" },
    { name: "Facial Tools", image: "/assets/images/stock/gua-sha-roller.jpg" },
    { name: "Bath & Body", image: "/assets/images/stock/bath-essentials.jpg" },
  ];

  function renderCategories() {
    const grid = document.querySelector("[data-category-grid]");
    if (!grid) return;
    grid.innerHTML = CATEGORIES.map(
      (c) => `
        <a class="category-tile" href="/shop.html?category=${encodeURIComponent(c.name)}">
          <span class="category-tile__media"><img src="${c.image}" alt="" loading="lazy" /></span>
          <span class="category-tile__name">${c.name}</span>
        </a>
      `
    ).join("");
  }

  // Once a product is in the cart, its card CTA swaps from "Add to cart"
  // to a +/- quantity stepper reflecting the cart line, instead of staying
  // a button that just keeps adding one more each click.
  function cardCtaHtml(product) {
    const line = window.IrisPharma.cart.getItems().find((i) => i.product.slug === product.slug);
    if (line) {
      return `
        <div class="qty-stepper qty-stepper--block product-card__cta">
          <button type="button" data-card-qty-minus="${product.slug}" aria-label="Decrease quantity">−</button>
          <span>${line.qty}</span>
          <button type="button" data-card-qty-plus="${product.slug}" aria-label="Increase quantity">+</button>
        </div>
      `;
    }
    return `
      <button type="button" class="btn btn-primary btn-block product-card__cta" data-add-to-cart="${product.slug}">
        Add to cart
      </button>
    `;
  }

  function productCardHtml(product) {
    const discount = window.IrisPharma.discountPercent(product);
    return `
      <article class="product-card">
        ${discount > 0 ? `<span class="product-card__badge">${discount}% OFF</span>` : ""}
        <a href="/products/${product.slug}.html" class="product-card__media">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
        </a>
        <div class="product-card__body">
          <span class="product-card__category">${product.category}</span>
          <a href="/products/${product.slug}.html">
            <h3 class="product-card__name">${product.name}</h3>
          </a>
          <p class="product-card__tagline">${product.tagline}</p>
          <div class="product-card__price-row">
            <span class="product-card__price">₹${product.price}</span>
            <span class="product-card__mrp">₹${product.mrp}</span>
            <span class="product-card__discount">${discount}% off</span>
          </div>
        </div>
        ${cardCtaHtml(product)}
      </article>
    `;
  }

  function renderBestsellers() {
    const grid = document.querySelector("[data-product-grid]");
    if (!grid) return;
    grid.innerHTML = window.IrisPharma.PRODUCTS.map(productCardHtml).join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderCategories();
    renderBestsellers();

    document.addEventListener("click", (e) => {
      const addBtn = e.target.closest("[data-add-to-cart]");
      if (addBtn) {
        const slug = addBtn.getAttribute("data-add-to-cart");
        window.IrisPharma.cart.addItem(slug, 1);
        window.IrisPharma.toast(`${window.IrisPharma.getProduct(slug).name} added to cart`);
        renderBestsellers();
        return;
      }

      const minusBtn = e.target.closest("[data-card-qty-minus]");
      if (minusBtn) {
        const slug = minusBtn.getAttribute("data-card-qty-minus");
        const line = window.IrisPharma.cart.getItems().find((i) => i.product.slug === slug);
        if (line) window.IrisPharma.cart.setQty(slug, line.qty - 1);
        renderBestsellers();
        return;
      }

      const plusBtn = e.target.closest("[data-card-qty-plus]");
      if (plusBtn) {
        const slug = plusBtn.getAttribute("data-card-qty-plus");
        const line = window.IrisPharma.cart.getItems().find((i) => i.product.slug === slug);
        if (line) window.IrisPharma.cart.setQty(slug, line.qty + 1);
        renderBestsellers();
      }
    });
  });
})();
