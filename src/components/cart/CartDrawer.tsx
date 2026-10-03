import { useNavigate } from "react-router-dom";
import { useUI } from "../../context/UIContext";
import { useCart } from "../../context/CartContext";
import { products } from "../../data/products";
import { CartItemRow } from "./CartItemRow";

export function CartDrawer() {
  const { isCartOpen, closeCart, showToast } = useUI();
  const { cart, cartTotalFormatted } = useCart();
  const navigate = useNavigate();

  function handleCheckout() {
    if (cart.length === 0) {
      showToast("Your bag is empty");
      return;
    }

    closeCart();
    navigate("/checkout");
  }

  return (
    <aside
      className={`fixed top-0 right-0 w-[min(450px,100%)] h-screen bg-cream z-[9000] flex flex-col transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-[25px] border-b border-border">
        <h2 className="font-serif text-[35px] font-normal">Your Bag</h2>
        <button
          onClick={() => closeCart()}
          className="border-0 bg-transparent text-[28px]"
        >
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {cart.length === 0 ? (
          <div className="text-center py-20 px-5 text-brown-light font-serif text-[30px]">
            Your bag is empty.
          </div>
        ) : (
          cart.map((line) => {
            const product = products.find((p) => p.id === line.id);
            if (!product) return null;
            return (
              <CartItemRow key={line.id} product={product} quantity={line.quantity} />
            );
          })
        )}
      </div>

      <div className="p-[25px] border-t border-border">
        <div className="flex justify-between font-serif text-[30px] mb-5">
          <span>Total</span>
          <strong>{cartTotalFormatted}</strong>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full py-[17px] border-0 bg-brown text-white text-[9px] uppercase tracking-[.18em]"
        >
          Proceed to Checkout
        </button>
      </div>
    </aside>
  );
}
