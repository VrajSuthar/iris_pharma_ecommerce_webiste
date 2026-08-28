// Tiny toast notification, shared by any page that needs "Added to cart"
// style feedback (home, shop, product pages).
window.IrisPharma = window.IrisPharma || {};

(function () {
  let el, hideTimer;

  function show(message) {
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("toast--visible");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => el.classList.remove("toast--visible"), 2200);
  }

  window.IrisPharma.toast = show;
})();
