export type ProductCategory = "face" | "serum" | "body" | "cleanser";

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  image: string;
  description: string;
}

export interface CartLine {
  id: number;
  quantity: number;
}

export interface JournalArticle {
  id: number;
  image: string;
  meta: string;
  title: string;
  excerpt: string;
  body: string[];
}

export type SortOption = "default" | "low" | "high" | "name";

export type FilterOption = "all" | ProductCategory;

export interface User {
  name: string;
  email: string;
}

export type OrderStatus = "placed" | "processing" | "shipped" | "out-for-delivery" | "delivered";

export interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  postalCode: string;
}

export type PaymentMethod = "card" | "upi" | "cod";

export interface Order {
  id: string;
  trackingNumber: string;
  placedAt: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  address: ShippingAddress;
  paymentMethod: PaymentMethod;
}
