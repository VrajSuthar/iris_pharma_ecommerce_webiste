import type { Product } from "../../types";
import { formatPrice } from "../../utils/formatPrice";
import { useWishlist } from "../../context/WishlistContext";

export function WishlistItemRow({ product }: { product: Product }) {
  const { addWishlistToCart, removeWishlist } = useWishlist();

  return (
    <div className="grid grid-cols-[90px_1fr] gap-[15px] py-[15px] border-b border-border">
      <img
        src={product.image}
        alt={product.name}
        className="w-[90px] h-[110px] object-cover"
      />

      <div>
        <div className="font-serif text-[23px]">{product.name}</div>
        <div className="text-[11px] mt-[5px]">{formatPrice(product.price)}</div>

        <div className="flex gap-2 mt-[15px]">
          <button
            onClick={() => addWishlistToCart(product.id)}
            className="px-[13px] py-[9px] border border-brown bg-brown text-white text-[8px] uppercase tracking-[.12em]"
          >
            Add to Bag
          </button>
          <button
            onClick={() => removeWishlist(product.id)}
            className="px-[13px] py-[9px] border border-border bg-transparent text-[8px] uppercase tracking-[.12em]"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
