import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, Order, PaymentMethod, ShippingAddress } from "../types";
import { products } from "../data/products";

const STORAGE_KEY = "irisOrders";
const SHIPPING_FEE = 99;
const FREE_SHIPPING_THRESHOLD = 1999;

function readStoredOrders(): Order[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Order[]) : [];
  } catch {
    return [];
  }
}

function generateOrderId(): string {
  const stamp = Date.now().toString().slice(-6);
  return `IRIS-${stamp}`;
}

function generateTrackingNumber(): string {
  const random = Math.floor(100000000 + Math.random() * 900000000);
  return `IND${random}`;
}

interface OrderContextValue {
  orders: Order[];
  placeOrder: (
    cart: CartLine[],
    address: ShippingAddress,
    paymentMethod: PaymentMethod,
  ) => Order;
  getOrder: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextValue | null>(null);

/* TODO: replace with real order-creation + payment capture API once the backend exists. */
export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(readStoredOrders);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const placeOrder = useCallback(
    (cart: CartLine[], address: ShippingAddress, paymentMethod: PaymentMethod) => {
      const items = cart.flatMap((line) => {
        const product = products.find((p) => p.id === line.id);
        if (!product) return [];
        return [
          {
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: line.quantity,
          },
        ];
      });

      const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
      const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

      const order: Order = {
        id: generateOrderId(),
        trackingNumber: generateTrackingNumber(),
        placedAt: new Date().toISOString(),
        items,
        subtotal,
        shippingFee,
        total: subtotal + shippingFee,
        address,
        paymentMethod,
      };

      setOrders((current) => [order, ...current]);
      return order;
    },
    [],
  );

  const getOrder = useCallback(
    (id: string) => orders.find((order) => order.id === id),
    [orders],
  );

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within an OrderProvider");
  return context;
}

export { SHIPPING_FEE, FREE_SHIPPING_THRESHOLD };
