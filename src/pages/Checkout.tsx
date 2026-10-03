import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { SectionLabel } from "../components/common/SectionLabel";
import { Reveal } from "../components/common/Reveal";
import { Button } from "../components/common/Button";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useOrders, SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from "../context/OrderContext";
import { formatPrice } from "../utils/formatPrice";
import { products } from "../data/products";
import type { PaymentMethod, ShippingAddress } from "../types";

const INPUT_CLASS =
  "w-full border-0 border-b border-brown outline-none bg-transparent py-[13px] text-[14px]";

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string }[] = [
  { value: "card", label: "Credit / Debit Card" },
  { value: "upi", label: "UPI" },
  { value: "cod", label: "Cash on Delivery" },
];

export function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: user?.name ?? "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const shippingFee = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = cartTotal + shippingFee;

  function updateField(field: keyof ShippingAddress, value: string) {
    setAddress((current) => ({ ...current, [field]: value }));
  }

  /* TODO: replace with a real payment gateway + backend order-creation call. */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const order = placeOrder(cart, address, paymentMethod);
    clearCart();
    navigate(`/order-confirmation/${order.id}`, { replace: true });
  }

  if (cart.length === 0) {
    return (
      <Reveal as="section" className="text-center px-[7vw] py-[180px]">
        <SectionLabel>Checkout</SectionLabel>
        <h1 className="font-serif text-[clamp(40px,5vw,60px)] font-normal mt-[20px]">
          Your bag is empty.
        </h1>
        <p className="mt-[20px] text-brown-light text-[14px]">
          Add something you love before checking out.
        </p>
        <Button to="/shop" className="mt-[35px]">
          Shop Collection
        </Button>
      </Reveal>
    );
  }

  return (
    <Reveal as="section" className="px-[7vw] max-mobile:px-[6vw] py-[140px] max-mobile:py-[90px]">
      <SectionLabel>Checkout</SectionLabel>
      <h1 className="font-serif text-[clamp(44px,5.5vw,70px)] font-normal -tracking-[.03em] mt-[18px] mb-[60px]">
        Complete your order.
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-[1.3fr_1fr] max-tablet:grid-cols-1 gap-[70px]"
      >
        <div>
          <h2 className="text-[9px] uppercase tracking-[.2em] mb-[25px]">Shipping Address</h2>

          <div className="grid grid-cols-2 gap-x-[25px] max-mobile:grid-cols-1">
            <div className="mb-[22px]">
              <label className="block text-[9px] uppercase tracking-[.18em] mb-[8px]">
                Full Name
              </label>
              <input
                type="text"
                required
                value={address.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <div className="mb-[22px]">
              <label className="block text-[9px] uppercase tracking-[.18em] mb-[8px]">
                Phone
              </label>
              <input
                type="tel"
                required
                value={address.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className={INPUT_CLASS}
              />
            </div>
          </div>

          <div className="mb-[22px]">
            <label className="block text-[9px] uppercase tracking-[.18em] mb-[8px]">
              Address
            </label>
            <input
              type="text"
              required
              value={address.line1}
              onChange={(event) => updateField("line1", event.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div className="grid grid-cols-3 gap-x-[25px] max-mobile:grid-cols-1">
            <div className="mb-[22px]">
              <label className="block text-[9px] uppercase tracking-[.18em] mb-[8px]">
                City
              </label>
              <input
                type="text"
                required
                value={address.city}
                onChange={(event) => updateField("city", event.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <div className="mb-[22px]">
              <label className="block text-[9px] uppercase tracking-[.18em] mb-[8px]">
                State
              </label>
              <input
                type="text"
                required
                value={address.state}
                onChange={(event) => updateField("state", event.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <div className="mb-[22px]">
              <label className="block text-[9px] uppercase tracking-[.18em] mb-[8px]">
                PIN Code
              </label>
              <input
                type="text"
                required
                value={address.postalCode}
                onChange={(event) => updateField("postalCode", event.target.value)}
                className={INPUT_CLASS}
              />
            </div>
          </div>

          <h2 className="text-[9px] uppercase tracking-[.2em] mb-[20px] mt-[40px]">
            Payment Method
          </h2>

          <div className="flex flex-col gap-[14px]">
            {PAYMENT_OPTIONS.map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-[12px] border px-[18px] py-[15px] cursor-pointer text-[13px] ${
                  paymentMethod === option.value
                    ? "border-brown bg-cream-dark"
                    : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={option.value}
                  checked={paymentMethod === option.value}
                  onChange={() => setPaymentMethod(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>

          <Button type="submit" className="w-full mt-[40px]">
            Place Order • {formatPrice(total)}
          </Button>
        </div>

        <div className="bg-cream-dark px-[35px] py-[35px] h-fit">
          <h2 className="text-[9px] uppercase tracking-[.2em] mb-[25px]">Order Summary</h2>

          <div className="flex flex-col gap-[18px]">
            {cart.map((line) => {
              const product = products.find((p) => p.id === line.id);
              if (!product) return null;
              return (
                <div key={line.id} className="flex items-center gap-[15px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[55px] h-[65px] object-cover"
                  />
                  <div className="flex-1">
                    <div className="text-[13px]">{product.name}</div>
                    <div className="text-[11px] text-brown-light">Qty {line.quantity}</div>
                  </div>
                  <div className="text-[13px]">
                    {formatPrice(product.price * line.quantity)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-border mt-[25px] pt-[20px] flex flex-col gap-[10px] text-[13px]">
            <div className="flex justify-between">
              <span className="text-brown-light">Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brown-light">Shipping</span>
              <span>{shippingFee === 0 ? "Free" : formatPrice(shippingFee)}</span>
            </div>
            <div className="flex justify-between font-serif text-[22px] mt-[10px]">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
          </div>
        </div>
      </form>
    </Reveal>
  );
}
