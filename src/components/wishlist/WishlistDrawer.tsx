import { useUI } from "../../context/UIContext";
import { useWishlist } from "../../context/WishlistContext";
import { products } from "../../data/products";
import { WishlistItemRow } from "./WishlistItemRow";

export function WishlistDrawer() {
  const { isWishlistOpen, closeWishlist } = useUI();
  const { wishlist } = useWishlist();

  return (
    <aside
      className={`fixed top-0 right-0 w-[min(450px,100%)] h-screen bg-cream z-[9000] flex flex-col transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
        isWishlistOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-[25px] border-b border-border">
        <div>
          <small className="text-[8px] tracking-[.25em]">IRIS PHARMA</small>
          <h2 className="font-serif text-[38px] font-normal mt-[3px]">Wishlist</h2>
        </div>
        <button
          onClick={() => closeWishlist()}
          className="border-0 bg-transparent text-[28px]"
        >
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {wishlist.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center text-brown-light font-serif text-[32px]">
            <div>
              Your wishlist
              <br />
              is waiting for you.
            </div>
          </div>
        ) : (
          wishlist.map((id) => {
            const product = products.find((p) => p.id === id);
            if (!product) return null;
            return <WishlistItemRow key={id} product={product} />;
          })
        )}
      </div>
    </aside>
  );
}
