import { useParams } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { formatPrice } from "../utils/formatPrice";
import { SectionLabel } from "../components/common/SectionLabel";
import { Reveal } from "../components/common/Reveal";
import { Button } from "../components/common/Button";
import { OrderStatusTracker } from "../components/orders/OrderStatusTracker";
import { NotFound } from "./NotFound";

const PAYMENT_LABELS: Record<string, string> = {
  card: "Credit / Debit Card",
  upi: "UPI",
  cod: "Cash on Delivery",
};

export function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { getOrder } = useOrders();
  const order = id ? getOrder(id) : undefined;

  if (!order) return <NotFound />;

  return (
    <Reveal as="section" className="px-[7vw] max-mobile:px-[6vw] py-[140px] max-mobile:py-[90px]">
      <SectionLabel>
        Order <span className="font-inter">{order.id}</span>
      </SectionLabel>
      <h1 className="font-serif text-[clamp(40px,5vw,58px)] font-normal -tracking-[.03em] mt-[18px]">
        Track your order.
      </h1>
      <p className="text-brown-light text-[13px] mt-[10px]">
        Tracking Number:{" "}
        <strong className="text-brown font-inter">{order.trackingNumber}</strong>
      </p>

      <div className="mt-[60px] mb-[70px] px-[5vw] max-mobile:px-0">
        <OrderStatusTracker order={order} />
      </div>

      <div className="grid grid-cols-[1.3fr_1fr] max-tablet:grid-cols-1 gap-[60px]">
        <div>
          <h2 className="text-[9px] uppercase tracking-[.2em] mb-[20px]">Items</h2>

          <div className="flex flex-col gap-[18px]">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-[15px]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[60px] h-[72px] object-cover"
                />
                <div className="flex-1">
                  <div className="text-[14px]">{item.name}</div>
                  <div className="text-[11px] text-brown-light">Qty {item.quantity}</div>
                </div>
                <div className="text-[13px]">{formatPrice(item.price * item.quantity)}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-border mt-[25px] pt-[20px] flex flex-col gap-[10px] text-[13px] max-w-[300px]">
            <div className="flex justify-between">
              <span className="text-brown-light">Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brown-light">Shipping</span>
              <span>{order.shippingFee === 0 ? "Free" : formatPrice(order.shippingFee)}</span>
            </div>
            <div className="flex justify-between font-serif text-[20px] mt-[10px]">
              <span>Total</span>
              <strong>{formatPrice(order.total)}</strong>
            </div>
          </div>
        </div>

        <div className="bg-cream-dark px-[30px] py-[30px] h-fit">
          <h2 className="text-[9px] uppercase tracking-[.2em] mb-[18px]">Shipping Address</h2>
          <p className="text-[13px] leading-[1.9] text-brown-light">
            {order.address.fullName}
            <br />
            {order.address.line1}
            <br />
            {order.address.city}, {order.address.state} {order.address.postalCode}
            <br />
            {order.address.phone}
          </p>

          <h2 className="text-[9px] uppercase tracking-[.2em] mb-[10px] mt-[25px]">
            Payment Method
          </h2>
          <p className="text-[13px] text-brown-light">
            {PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}
          </p>
        </div>
      </div>

      <div className="mt-[50px]">
        <Button to="/orders" variant="light">
          Back to Orders
        </Button>
      </div>
    </Reveal>
  );
}
