// products/*.html — shared page behavior. Reads the product slug from the
// URL (the filename, e.g. /products/derma-555-malam.html -> "derma-555-malam")
// and renders the gallery, buy box and related products from data.js.
(function () {
  function slugFromUrl() {
    const file = window.location.pathname.split("/").pop() || "";
    return file.replace(/\.html$/, "");
  }

  // Deterministic dummy rating so the same product always shows the same
  // stars/review count across visits, without needing a real reviews backend.
  function dummyRating(slug) {
    let hash = 0;
    for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
    const rating = (4.3 + (hash % 6) / 10).toFixed(1);
    const reviews = 60 + (hash % 240);
    return { rating, reviews };
  }

  function starRow(rating) {
    const full = Math.round(rating);
    return Array.from({ length: 5 }, (_, i) => (i < full ? "★" : "☆")).join("");
  }

  function galleryHtml(product) {
    const images = product.gallery && product.gallery.length ? product.gallery : [product.image];
    return `
      <div class="pdp__gallery">
        <div class="pdp__main-image">
          <img src="${images[0]}" alt="${product.name}" data-pdp-main-image />
        </div>
        ${
          images.length > 1
            ? `<div class="pdp__thumbs">
                ${images
                  .map(
                    (src, i) =>
                      `<button type="button" class="pdp__thumb${i === 0 ? " is-active" : ""}" data-pdp-thumb="${src}">
                        <img src="${src}" alt="" />
                      </button>`
                  )
                  .join("")}
              </div>`
            : ""
        }
      </div>
    `;
  }

  function buyboxHtml(product) {
    const discount = window.IrisPharma.discountPercent(product);
    const { rating, reviews } = dummyRating(product.slug);
    return `
      <div class="pdp__buybox">
        <nav class="pdp__breadcrumb">
          <a href="/shop.html">Shop</a>
          <span>/</span>
          <a href="/shop.html?category=${encodeURIComponent(product.category)}">${product.category}</a>
        </nav>
        <h1 class="pdp__name">${product.name}</h1>
        <div class="pdp__rating">
          <span class="pdp__stars">${starRow(rating)}</span>
          <span>${rating} (${reviews} reviews)</span>
        </div>
        <p class="pdp__tagline">${product.tagline}</p>
        <div class="pdp__price-row">
          <span class="pdp__price">₹${product.price}</span>
          <span class="pdp__mrp">₹${product.mrp}</span>
          ${discount > 0 ? `<span class="badge badge--success">${discount}% off</span>` : ""}
        </div>
        <p class="pdp__tax-note">Inclusive of all taxes</p>
        ${product.promoTag ? `<span class="badge badge--amber">${product.promoTag}</span>` : ""}

        <div class="pdp__qty-row">
          <div class="qty-stepper">
            <button type="button" data-pdp-qty-minus aria-label="Decrease quantity">−</button>
            <span data-pdp-qty>1</span>
            <button type="button" data-pdp-qty-plus aria-label="Increase quantity">+</button>
          </div>
          <button type="button" class="btn btn-outline pdp__add-btn" data-pdp-add>Add to cart</button>
        </div>
        <a class="btn btn-primary btn-block" data-pdp-buy-now href="/cart.html">Buy now</a>

        <a
          class="pdp__whatsapp-link"
          href="https://wa.me/919022022433?text=${encodeURIComponent(
            `Hi! I have a question about ${product.name}.`
          )}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg class="icon" viewBox="0 0 24 24"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5"/></svg>
          Ask a question on WhatsApp
        </a>

        <div class="pdp__trust-row">
          <span><svg class="icon" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>100% Ayurvedic</span>
          <span><svg class="icon" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>Cash before dispatch</span>
        </div>

        <div class="pdp__accordion">
          <details open>
            <summary>Description</summary>
            <p>${product.description}</p>
          </details>
          <details>
            <summary>How to use</summary>
            <ol>${product.howToUse.map((step) => `<li>${step}</li>`).join("")}</ol>
          </details>
          <details>
            <summary>Shipping &amp; returns</summary>
            <p>
              Orders are confirmed and dispatched after WhatsApp confirmation.
              See our <a href="/shipping-policy.html">Shipping Policy</a> and
              <a href="/refund-policy.html">Refund &amp; Cancellation Policy</a> for details.
            </p>
          </details>
        </div>
      </div>
    `;
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

  function relatedCardHtml(product) {
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

  let currentProductSlug = null;

  function renderRelated() {
    if (!currentProductSlug) return;
    const related = window.IrisPharma.PRODUCTS.filter((p) => p.slug !== currentProductSlug).slice(0, 4);
    const relatedSection = document.querySelector("[data-pdp-related-section]");
    const relatedGrid = document.querySelector("[data-pdp-related]");
    if (related.length && relatedSection && relatedGrid) {
      relatedSection.hidden = false;
      relatedGrid.innerHTML = related.map(relatedCardHtml).join("");
    }
  }

  function render() {
    const root = document.querySelector("[data-pdp-root]");
    if (!root) return;
    const product = window.IrisPharma.getProduct(slugFromUrl());
    if (!product) {
      root.innerHTML = `
        <div class="pdp__not-found">
          <h1>Product not found</h1>
          <p>This product may have been removed or renamed.</p>
          <a class="btn btn-primary" href="/shop.html">Back to shop</a>
        </div>
      `;
      return;
    }

    document.title = `${product.name} — Iris Pharma`;
    currentProductSlug = product.slug;
    root.classList.add("pdp");
    root.innerHTML = galleryHtml(product) + buyboxHtml(product);

    let qty = 1;
    const qtyEl = root.querySelector("[data-pdp-qty]");

    root.querySelectorAll("[data-pdp-thumb]").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        root.querySelector("[data-pdp-main-image]").src = thumb.getAttribute("data-pdp-thumb");
        root.querySelectorAll("[data-pdp-thumb]").forEach((t) => t.classList.remove("is-active"));
        thumb.classList.add("is-active");
      });
    });

    root.querySelector("[data-pdp-qty-minus]")?.addEventListener("click", () => {
      qty = Math.max(1, qty - 1);
      qtyEl.textContent = String(qty);
    });
    root.querySelector("[data-pdp-qty-plus]")?.addEventListener("click", () => {
      qty = Math.min(10, qty + 1);
      qtyEl.textContent = String(qty);
    });
    root.querySelector("[data-pdp-add]")?.addEventListener("click", () => {
      window.IrisPharma.cart.addItem(product.slug, qty);
      window.IrisPharma.toast(`${product.name} added to cart`);
    });
    root.querySelector("[data-pdp-buy-now]")?.addEventListener("click", () => {
      window.IrisPharma.cart.addItem(product.slug, qty);
    });

    renderRelated();
  }

  document.addEventListener("DOMContentLoaded", () => {
    render();
    document.addEventListener("click", (e) => {
      const addBtn = e.target.closest("[data-add-to-cart]");
      if (addBtn) {
        const slug = addBtn.getAttribute("data-add-to-cart");
        window.IrisPharma.cart.addItem(slug, 1);
        window.IrisPharma.toast(`${window.IrisPharma.getProduct(slug).name} added to cart`);
        renderRelated();
        return;
      }

      const minusBtn = e.target.closest("[data-card-qty-minus]");
      if (minusBtn) {
        const slug = minusBtn.getAttribute("data-card-qty-minus");
        const line = window.IrisPharma.cart.getItems().find((i) => i.product.slug === slug);
        if (line) window.IrisPharma.cart.setQty(slug, line.qty - 1);
        renderRelated();
        return;
      }

      const plusBtn = e.target.closest("[data-card-qty-plus]");
      if (plusBtn) {
        const slug = plusBtn.getAttribute("data-card-qty-plus");
        const line = window.IrisPharma.cart.getItems().find((i) => i.product.slug === slug);
        if (line) window.IrisPharma.cart.setQty(slug, line.qty + 1);
        renderRelated();
      }
    });
  });
})();
