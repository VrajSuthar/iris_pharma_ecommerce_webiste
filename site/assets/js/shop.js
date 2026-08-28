// shop.html — page-specific behavior: category filter chips + product grid.
(function () {
  let activeCategory = "All";

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

  function getCategories() {
    const seen = new Set();
    window.IrisPharma.PRODUCTS.forEach((p) => seen.add(p.category));
    return ["All", ...seen];
  }

  function categoryFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category") || "All";
  }

  function renderFilters(active) {
    const el = document.querySelector("[data-shop-filters]");
    if (!el) return;
    el.innerHTML = getCategories()
      .map(
        (c) =>
          `<button type="button" class="chip${c === active ? " is-active" : ""}" data-filter="${c}">${c}</button>`
      )
      .join("");
  }

  function renderGrid(active) {
    const grid = document.querySelector("[data-product-grid]");
    const count = document.querySelector("[data-shop-count]");
    if (!grid) return;
    const products =
      active === "All"
        ? window.IrisPharma.PRODUCTS
        : window.IrisPharma.PRODUCTS.filter((p) => p.category === active);
    grid.innerHTML = products.map(productCardHtml).join("");
    if (count) {
      count.textContent = `${products.length} product${products.length === 1 ? "" : "s"}`;
    }
  }

  function setActive(category) {
    activeCategory = category;
    renderFilters(category);
    renderGrid(category);
    const url = new URL(window.location.href);
    if (category === "All") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", category);
    }
    window.history.replaceState({}, "", url);
  }

  document.addEventListener("DOMContentLoaded", () => {
    setActive(categoryFromUrl());

    document.addEventListener("click", (e) => {
      const filterBtn = e.target.closest("[data-filter]");
      if (filterBtn) {
        setActive(filterBtn.getAttribute("data-filter"));
        return;
      }

      const cartBtn = e.target.closest("[data-add-to-cart]");
      if (cartBtn) {
        const slug = cartBtn.getAttribute("data-add-to-cart");
        window.IrisPharma.cart.addItem(slug, 1);
        window.IrisPharma.toast(`${window.IrisPharma.getProduct(slug).name} added to cart`);
        renderGrid(activeCategory);
        return;
      }

      const minusBtn = e.target.closest("[data-card-qty-minus]");
      if (minusBtn) {
        const slug = minusBtn.getAttribute("data-card-qty-minus");
        const line = window.IrisPharma.cart.getItems().find((i) => i.product.slug === slug);
        if (line) window.IrisPharma.cart.setQty(slug, line.qty - 1);
        renderGrid(activeCategory);
        return;
      }

      const plusBtn = e.target.closest("[data-card-qty-plus]");
      if (plusBtn) {
        const slug = plusBtn.getAttribute("data-card-qty-plus");
        const line = window.IrisPharma.cart.getItems().find((i) => i.product.slug === slug);
        if (line) window.IrisPharma.cart.setQty(slug, line.qty + 1);
        renderGrid(activeCategory);
      }
    });
  });
})();
