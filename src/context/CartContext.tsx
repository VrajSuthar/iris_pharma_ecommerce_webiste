import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { products } from "../data/products";
import type { CartLine } from "../types";
import { formatPrice } from "../utils/formatPrice";
import { useUI } from "./UIContext";

const STORAGE_KEY = "irisCart";

type CartAction =
  | { type: "ADD"; id: number }
  | { type: "CHANGE_QUANTITY"; id: number; amount: number }
  | { type: "REMOVE"; id: number }
  | { type: "CLEAR" };

function readInitialCart(): CartLine[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartLine[]) : [];
  } catch {
    return [];
  }
}

function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((line) => line.id === action.id);
      if (existing) {
        return state.map((line) =>
          line.id === action.id ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }
      return [...state, { id: action.id, quantity: 1 }];
    }
    case "CHANGE_QUANTITY": {
      const next = state.map((line) =>
        line.id === action.id
          ? { ...line, quantity: line.quantity + action.amount }
          : line,
      );
      return next.filter((line) => line.quantity > 0);
    }
    case "REMOVE":
      return state.filter((line) => line.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

interface CartContextValue {
  cart: CartLine[];
  cartCount: number;
  cartTotal: number;
  cartTotalFormatted: string;
  getCartQuantity: (id: number) => number;
  addToCart: (id: number) => void;
  changeQuantity: (id: number, amount: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, undefined, readInitialCart);
  const { showToast } = useUI();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const getCartQuantity = useCallback(
    (id: number) => cart.find((line) => line.id === id)?.quantity ?? 0,
    [cart],
  );

  const addToCart = useCallback(
    (id: number) => {
      const product = products.find((p) => p.id === id);
      if (!product) return;

      const currentQuantity = cart.find((line) => line.id === id)?.quantity ?? 0;
      dispatch({ type: "ADD", id });
      showToast(`${product.name} • ${currentQuantity + 1} in bag`);
    },
    [cart, showToast],
  );

  const changeQuantity = useCallback((id: number, amount: number) => {
    dispatch({ type: "CHANGE_QUANTITY", id, amount });
  }, []);

  const removeFromCart = useCallback(
    (id: number) => {
      dispatch({ type: "REMOVE", id });
      showToast("Product removed");
    },
    [showToast],
  );

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((total, line) => total + line.quantity, 0),
    [cart],
  );

  const cartTotal = useMemo(() => {
    return cart.reduce((total, line) => {
      const product = products.find((p) => p.id === line.id);
      return product ? total + product.price * line.quantity : total;
    }, 0);
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      cartTotal,
      cartTotalFormatted: formatPrice(cartTotal),
      getCartQuantity,
      addToCart,
      changeQuantity,
      removeFromCart,
      clearCart,
    }),
    [
      cart,
      cartCount,
      cartTotal,
      getCartQuantity,
      addToCart,
      changeQuantity,
      removeFromCart,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
