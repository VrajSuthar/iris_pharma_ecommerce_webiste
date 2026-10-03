import { Link } from "react-router-dom";
import type { Product } from "../../types";
import { formatPrice } from "../../utils/formatPrice";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useUI } from "../../context/UIContext";
import { Reveal } from "../common/Reveal";

export function ProductCard({ product }: { product: Product }) {
  const { getCartQuantity, addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { openQuickView } = useUI();

  const quantity = getCartQuantity(product.id);
  const wishlisted = isWishlisted(product.id);

  return (
    <Reveal as="article" className="product group relative">
      <div className="relative h-[460px] max-mobile:h-[500px] overflow-hidden bg-cream-dark">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.08]"
          />
        </Link>

        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="Wishlist"
          className={`absolute top-[15px] right-[15px] w-[38px] h-[38px] border-0 rounded-full z-[3] text-[17px] ${
            wishlisted ? "bg-rose text-white" : "bg-white/90"
          }`}
        >
          {wishlisted ? "♥" : "♡"}
        </button>

        <button
          onClick={() => openQuickView(product.id)}
          className="absolute left-5 right-5 bottom-5 p-[15px] border-0 bg-white text-brown text-[9px] uppercase tracking-[.18em] translate-y-[70px] transition-transform duration-[400ms] group-hover:translate-y-0"
        >
          Quick View
        </button>
      </div>

      <div className="py-[17px] px-[2px]">
        <div className="text-[8px] uppercase tracking-[.2em] text-brown-light">
          {product.categoryName}
        </div>

        <h3 className="font-serif text-[27px] font-medium mt-[5px]">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="text-[12px] mt-1">{formatPrice(product.price)}</div>

        <button
          onClick={() => addToCart(product.id)}
          className={`mt-3 w-full border border-brown py-[11px] text-[8px] uppercase tracking-[.15em] transition duration-300 ${
            quantity > 0
              ? "bg-brown text-white hover:bg-rose-dark hover:border-rose-dark"
              : "bg-transparent hover:bg-brown hover:text-white"
          }`}
        >
          {quantity > 0 ? `Added • ${quantity}` : "Add To Bag"}
        </button>
      </div>
    </Reveal>
  );
}
