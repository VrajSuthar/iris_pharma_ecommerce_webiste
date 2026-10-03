import type { Product } from "../../types";
import { formatPrice } from "../../utils/formatPrice";
import { useCart } from "../../context/CartContext";

interface CartItemRowProps {
  product: Product;
  quantity: number;
}

export function CartItemRow({ product, quantity }: CartItemRowProps) {
  const { changeQuantity, removeFromCart } = useCart();

  return (
    <div className="grid grid-cols-[85px_1fr_auto] gap-[15px] py-[15px] border-b border-border">
      <img
        src={product.image}
        alt={product.name}
        className="w-[85px] h-[100px] object-cover"
      />

      <div>
        <div className="font-serif text-[21px]">{product.name}</div>
        <div className="text-[11px] mt-[5px]">{formatPrice(product.price)}</div>

        <div className="flex items-center gap-[10px] mt-3">
          <button
            onClick={() => changeQuantity(product.id, -1)}
            className="w-[25px] h-[25px] border border-border bg-transparent"
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => changeQuantity(product.id, 1)}
            className="w-[25px] h-[25px] border border-border bg-transparent"
          >
            +
          </button>
        </div>

        <button
          onClick={() => removeFromCart(product.id)}
          className="border-0 bg-transparent text-rose-dark text-[10px] mt-[10px]"
        >
          Remove
        </button>
      </div>

      <strong>{formatPrice(product.price * quantity)}</strong>
    </div>
  );
}
