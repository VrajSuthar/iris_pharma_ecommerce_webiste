import type { Order, OrderStatus } from "../types";

const STATUS_ORDER: OrderStatus[] = [
  "placed",
  "processing",
  "shipped",
  "out-for-delivery",
  "delivered",
];

export const STATUS_LABELS: Record<OrderStatus, string> = {
  placed: "Order Placed",
  processing: "Processing",
  shipped: "Shipped",
  "out-for-delivery": "Out for Delivery",
  delivered: "Delivered",
};

/* Demo-only: simulates progress over elapsed minutes since placement so the
   tracker has something to show without a real fulfillment backend. */
const MINUTES_PER_STAGE = 3;

export function getOrderStatus(order: Order): OrderStatus {
  const elapsedMinutes = (Date.now() - new Date(order.placedAt).getTime()) / 60000;
  const stageIndex = Math.min(
    Math.floor(elapsedMinutes / MINUTES_PER_STAGE),
    STATUS_ORDER.length - 1,
  );
  return STATUS_ORDER[stageIndex];
}

export interface OrderStep {
  status: OrderStatus;
  label: string;
  done: boolean;
  active: boolean;
}

export function getOrderSteps(order: Order): OrderStep[] {
  const currentStatus = getOrderStatus(order);
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);

  return STATUS_ORDER.map((status, index) => ({
    status,
    label: STATUS_LABELS[status],
    done: index <= currentIndex,
    active: index === currentIndex,
  }));
}
