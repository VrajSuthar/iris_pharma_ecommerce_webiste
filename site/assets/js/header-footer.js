// Shared header/footer behavior — every page includes this after cart.js.
// Keeps the cart-count badge in sync with localStorage, fills in the
// footer's copyright year, and drives the mobile slide-in nav drawer.
(function () {
  function renderCartBadge() {
    const badge = document.querySelector("[data-cart-badge]");
    if (!badge) return;
    const count = window.IrisPharma.cart.getCount();
    badge.textContent = count > 9 ? "9+" : String(count);
    badge.hidden = count === 0;
  }

  function renderYear() {
    const el = document.querySelector("[data-year]");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function setMenuOpen(isOpen) {
    const nav = document.getElementById("nav-menu");
    const overlay = document.getElementById("navOverlay");
    const btn = document.querySelector(".site-header__menu-toggle");
    if (!nav) return;
    nav.classList.toggle("is-open", isOpen);
    if (overlay) overlay.classList.toggle("is-open", isOpen);
    if (btn) btn.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  // Referenced by the header's onclick="toggleMobileMenu()" markup.
  window.toggleMobileMenu = function toggleMobileMenu() {
    const nav = document.getElementById("nav-menu");
    if (!nav) return;
    setMenuOpen(!nav.classList.contains("is-open"));
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderCartBadge();
    renderYear();

    const nav = document.getElementById("nav-menu");
    if (nav) {
      nav.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => setMenuOpen(false))
      );
    }

    const overlay = document.getElementById("navOverlay");
    if (overlay) overlay.addEventListener("click", () => setMenuOpen(false));
  });

  window.addEventListener("cart:updated", renderCartBadge);
})();
