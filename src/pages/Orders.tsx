import { Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { formatPrice } from "../utils/formatPrice";
import { getOrderStatus, STATUS_LABELS } from "../utils/orderStatus";
import { SectionLabel } from "../components/common/SectionLabel";
import { Reveal } from "../components/common/Reveal";
import { Button } from "../components/common/Button";

export function Orders() {
  const { orders } = useOrders();

  return (
    <Reveal as="section" className="px-[7vw] max-mobile:px-[6vw] py-[140px] max-mobile:py-[90px]">
      <SectionLabel>Account</SectionLabel>
      <h1 className="font-serif text-[clamp(44px,5.5vw,70px)] font-normal -tracking-[.03em] mt-[18px] mb-[60px]">
        My Orders.
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-[80px]">
          <p className="text-brown-light text-[14px]">
            You haven't placed any orders yet.
          </p>
          <Button to="/shop" className="mt-[30px]">
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-[20px]">
          {orders.map((order) => {
            const status = getOrderStatus(order);
            return (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="flex items-center justify-between gap-[20px] border border-border px-[28px] py-[22px] max-mobile:flex-col max-mobile:items-start max-mobile:gap-[12px] hover:bg-white-warm transition-colors duration-300"
              >
                <div className="flex items-center gap-[20px]">
                  <div className="flex -space-x-4">
                    {order.items.slice(0, 3).map((item) => (
                      <img
                        key={item.id}
                        src={item.image}
                        alt={item.name}
                        className="w-[52px] h-[62px] object-cover border-2 border-cream"
                      />
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-[52px] h-[62px] flex items-center justify-center bg-cream-dark border-2 border-cream text-[11px] text-brown-light">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="text-[15px] font-inter font-medium">{order.id}</div>
                    <div className="text-[11px] text-brown-light mt-[4px]">
                      {new Date(order.placedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      • {order.items.reduce((count, item) => count + item.quantity, 0)} item
                      {order.items.reduce((count, item) => count + item.quantity, 0) > 1
                        ? "s"
                        : ""}
                    </div>
                  </div>
                </div>

                <div className="text-[9px] uppercase tracking-[.15em] px-3 py-[6px] border border-brown">
                  {STATUS_LABELS[status]}
                </div>

                <strong className="text-[15px]">{formatPrice(order.total)}</strong>
              </Link>
            );
          })}
        </div>
      )}
    </Reveal>
  );
}
