import { useUI } from "../../context/UIContext";

export function Overlay() {
  const { isCartOpen, isWishlistOpen, closeOverlays } = useUI();
  const isOpen = isCartOpen || isWishlistOpen;

  return (
    <div
      onClick={closeOverlays}
      className={`fixed inset-0 bg-black/38 z-[8000] transition-opacity duration-[400ms] ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    />
  );
}
