// Cart engine — localStorage-backed, shared by every page. Any page that
// changes the cart (add/remove/qty) dispatches a "cart:updated" event on
// window so other UI on the same page (e.g. the header badge) can react
// without a framework.
window.IrisPharma = window.IrisPharma || {};

(function () {
  const STORAGE_KEY = "iris-pharma-cart";
  const PROMO_KEY = "iris-pharma-promo";

  function readLines() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (l) =>
          l &&
          typeof l.slug === "string" &&
          Number.isInteger(l.qty) &&
          l.qty > 0
      );
    } catch {
      return [];
    }
  }

  function writeLines(lines) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    window.dispatchEvent(new CustomEvent("cart:updated"));
  }

  function addItem(slug, qty = 1) {
    if (!window.IrisPharma.getProduct(slug)) return;
    const lines = readLines();
    const existing = lines.find((l) => l.slug === slug);
    if (existing) {
      existing.qty += qty;
    } else {
      lines.push({ slug, qty });
    }
    writeLines(lines);
  }

  function removeItem(slug) {
    writeLines(readLines().filter((l) => l.slug !== slug));
  }

  function setQty(slug, qty) {
    const lines = readLines();
    if (qty < 1) {
      writeLines(lines.filter((l) => l.slug !== slug));
      return;
    }
    const existing = lines.find((l) => l.slug === slug);
    if (existing) {
      existing.qty = qty;
      writeLines(lines);
    }
  }

  function clear() {
    writeLines([]);
    clearPromoCode();
  }

  function setPromoCode(code) {
    if (!code) {
      clearPromoCode();
      return;
    }
    window.localStorage.setItem(PROMO_KEY, String(code).trim().toUpperCase());
    window.dispatchEvent(new CustomEvent("cart:updated"));
  }

  function getPromoCode() {
    return window.localStorage.getItem(PROMO_KEY) || null;
  }

  function clearPromoCode() {
    window.localStorage.removeItem(PROMO_KEY);
    window.dispatchEvent(new CustomEvent("cart:updated"));
  }

  function getItems() {
    return readLines()
      .map((l) => {
        const product = window.IrisPharma.getProduct(l.slug);
        return product ? { product, qty: l.qty } : null;
      })
      .filter(Boolean);
  }

  function getCount() {
    return getItems().reduce((sum, i) => sum + i.qty, 0);
  }

  function getSubtotal() {
    return getItems().reduce((sum, i) => sum + i.product.price * i.qty, 0);
  }

  function getMrpSubtotal() {
    return getItems().reduce((sum, i) => sum + i.product.mrp * i.qty, 0);
  }

  window.IrisPharma.cart = {
    addItem,
    removeItem,
    setQty,
    clear,
    getItems,
    getCount,
    getSubtotal,
    getMrpSubtotal,
    setPromoCode,
    getPromoCode,
    clearPromoCode,
  };
})();
