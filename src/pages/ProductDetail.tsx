import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { formatPrice } from "../utils/formatPrice";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { NotFound } from "./NotFound";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));
  const { getCartQuantity, addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  if (!product) return <NotFound />;

  const quantity = getCartQuantity(product.id);
  const wishlisted = isWishlisted(product.id);

  return (
    <section className="grid grid-cols-2 max-mobile:grid-cols-1 min-h-[700px]">
      <div className="min-h-[400px] max-mobile:min-h-[350px] bg-cream-dark">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col justify-center px-[10vw] py-[10vw] max-mobile:px-[6vw] max-mobile:py-10">
        <small className="text-[8px] uppercase tracking-[.2em]">{product.categoryName}</small>

        <h1 className="font-serif text-[clamp(45px,6vw,70px)] font-normal leading-[.9] my-[15px]">
          {product.name}
        </h1>

        <strong className="text-[16px]">{formatPrice(product.price)}</strong>

        <p className="text-[13px] text-brown-light leading-[1.7] mt-[15px] mb-[25px] max-w-[450px]">
          {product.description}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => addToCart(product.id)}
            className="px-7 py-[15px] border border-brown bg-brown text-white text-[9px] uppercase tracking-[.18em]"
          >
            {quantity > 0 ? `Add More • ${quantity} in Bag` : "Add To Bag"}
          </button>

          <button
            onClick={() => toggleWishlist(product.id)}
            aria-label="Wishlist"
            className={`w-[52px] h-[52px] rounded-full border border-border text-[18px] ${
              wishlisted ? "bg-rose text-white" : "bg-transparent"
            }`}
          >
            {wishlisted ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </section>
  );
}
