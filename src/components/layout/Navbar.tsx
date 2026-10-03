import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useNavbarScroll } from "../../hooks/useNavbarScroll";
import { useUI } from "../../context/UIContext";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Journal", to: "/journal" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const isScrolled = useNavbarScroll();
  const location = useLocation();
  const {
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    openCart,
    openWishlist,
    openSearch,
  } = useUI();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleAccountClick() {
    if (isAuthenticated) {
      logout();
      navigate("/");
      return;
    }
    navigate("/login");
  }

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  return (
    <header
      className={`fixed top-0 left-0 w-full h-[82px] max-mobile:h-[72px] px-[5vw] flex items-center justify-between z-[5000] backdrop-blur-xl border-b transition-colors duration-300 ${
        isScrolled
          ? "bg-[rgba(245,239,231,.96)] border-border"
          : "bg-[rgba(245,239,231,.72)] border-transparent"
      }`}
    >
      <Link to="/" className="font-serif text-[31px] tracking-[.08em]">
        IRIS
        <span className="block font-sans text-center text-[7px] tracking-[.35em] -mt-1.5">
          PHARMA
        </span>
      </Link>

      <nav>
        <ul
          className={`flex list-none gap-[34px] max-tablet:flex-col max-tablet:gap-[25px] max-tablet:absolute max-tablet:top-[82px] max-tablet:left-0 max-tablet:w-full max-tablet:px-[6vw] max-tablet:py-[30px] max-tablet:bg-cream max-tablet:border-b max-tablet:border-border ${
            isMobileMenuOpen ? "max-tablet:flex" : "max-tablet:hidden"
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `nav-link-underline text-[9px] uppercase tracking-[.18em] ${
                    isActive ? "active text-brown" : "text-brown-light"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-[5px]">
        <button
          onClick={openSearch}
          aria-label="Search"
          className="relative w-10 h-10 border-0 bg-transparent text-brown"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-[18px] h-[18px] mx-auto"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
        </button>

        <button
          onClick={handleAccountClick}
          aria-label={isAuthenticated ? "Log out" : "Log in"}
          title={isAuthenticated ? "Log out" : "Log in"}
          className="relative w-10 h-10 border-0 bg-transparent text-brown"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-[18px] h-[18px] mx-auto"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
          </svg>
        </button>

        <button
          onClick={openWishlist}
          aria-label="Wishlist"
          className="relative w-10 h-10 border-0 bg-transparent text-brown text-[21px]"
        >
          ♡
          <span className="absolute top-px right-0 min-w-4 h-4 px-1 flex items-center justify-center rounded-full bg-brown text-white text-[8px]">
            {wishlist.length}
          </span>
        </button>

        <button
          onClick={openCart}
          aria-label="Cart"
          className="relative w-10 h-10 border-0 bg-transparent text-brown text-[21px]"
        >
          🛍
          <span className="absolute top-px right-0 min-w-4 h-4 px-1 flex items-center justify-center rounded-full bg-brown text-white text-[8px]">
            {cartCount}
          </span>
        </button>

        <button
          onClick={toggleMobileMenu}
          aria-label="Menu"
          className="hidden max-tablet:block border-0 bg-transparent"
        >
          <span className="block w-[23px] h-px bg-brown m-1.5" />
          <span className="block w-[23px] h-px bg-brown m-1.5" />
        </button>
      </div>
    </header>
  );
}
