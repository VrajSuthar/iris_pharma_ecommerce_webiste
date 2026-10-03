import { useParams } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { formatPrice } from "../utils/formatPrice";
import { Reveal } from "../components/common/Reveal";
import { Button } from "../components/common/Button";
import { NotFound } from "./NotFound";

export function OrderConfirmation() {
  const { id } = useParams<{ id: string }>();
  const { getOrder } = useOrders();
  const order = id ? getOrder(id) : undefined;

  if (!order) return <NotFound />;

  return (
    <Reveal as="section" className="text-center px-[7vw] py-[160px] max-mobile:py-[100px]">
      <div className="w-[70px] h-[70px] mx-auto rounded-full bg-brown text-white flex items-center justify-center text-[30px]">
        ✓
      </div>

      <h1 className="font-serif text-[clamp(40px,5vw,62px)] font-normal -tracking-[.03em] mt-[30px]">
        Thank you for your order.
      </h1>

      <p className="max-w-[450px] mx-auto mt-[18px] text-brown-light text-[14px] leading-[1.8]">
        A confirmation has been sent to your email. Your order is now being
        prepared.
      </p>

      <div className="inline-flex flex-col gap-[6px] mt-[35px] text-[13px]">
        <span className="text-brown-light">
          Order Number: <strong className="text-brown font-inter">{order.id}</strong>
        </span>
        <span className="text-brown-light">
          Total Paid: <strong className="text-brown">{formatPrice(order.total)}</strong>
        </span>
      </div>

      <div className="flex gap-3 justify-center mt-[40px] flex-wrap">
        <Button to={`/orders/${order.id}`}>Track Order</Button>
        <Button to="/shop" variant="light">
          Continue Shopping
        </Button>
      </div>
    </Reveal>
  );
}
