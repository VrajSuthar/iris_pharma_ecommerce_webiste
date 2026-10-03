import type { MouseEvent } from "react";
import { useUI } from "../../context/UIContext";
import { useCart } from "../../context/CartContext";
import { products } from "../../data/products";
import { formatPrice } from "../../utils/formatPrice";

export function QuickViewModal() {
  const { quickViewProductId, closeQuickView } = useUI();
  const { getCartQuantity, addToCart } = useCart();

  const product = products.find((p) => p.id === quickViewProductId);
  const isOpen = Boolean(product);

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) closeQuickView();
  }

  const quantity = product ? getCartQuantity(product.id) : 0;

  return (
    <div
      onClick={handleBackdropClick}
      className={`fixed inset-0 z-[10000] bg-black/40 flex items-center justify-center p-[30px] transition-opacity duration-[400ms] ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {product && (
        <div className="max-w-[850px] w-full bg-cream grid grid-cols-2 max-mobile:grid-cols-1 relative max-h-[90vh] overflow-auto">
          <button
            onClick={closeQuickView}
            className="absolute right-5 top-[15px] z-10 w-[35px] h-[35px] border-0 bg-white rounded-full"
          >
            ×
          </button>

          <div className="min-h-[500px] max-mobile:min-h-[350px]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="px-[45px] py-[60px] max-mobile:px-[30px] max-mobile:py-10 flex flex-col justify-center">
            <small className="text-[8px] uppercase tracking-[.2em]">
              {product.categoryName}
            </small>
            <h2 className="font-serif text-[55px] font-normal leading-[.9] my-[15px]">
              {product.name}
            </h2>
            <strong>{formatPrice(product.price)}</strong>
            <p className="text-[13px] text-brown-light leading-[1.7] mt-[15px] mb-[25px]">
              {product.description}
            </p>

            <button
              onClick={() => addToCart(product.id)}
              className="px-7 py-[15px] border border-brown bg-brown text-white text-[9px] uppercase tracking-[.18em] text-center"
            >
              {quantity > 0 ? `Add More • ${quantity} in Bag` : "Add To Bag"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
