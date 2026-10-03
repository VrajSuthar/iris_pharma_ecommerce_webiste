import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import { useUI } from "./UIContext";
import { useCart } from "./CartContext";

const STORAGE_KEY = "irisWishlist";

type WishlistAction =
  | { type: "ADD"; id: number }
  | { type: "REMOVE"; id: number };

function readInitialWishlist(): number[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as number[]) : [];
  } catch {
    return [];
  }
}

function wishlistReducer(state: number[], action: WishlistAction): number[] {
  switch (action.type) {
    case "ADD":
      return state.includes(action.id) ? state : [...state, action.id];
    case "REMOVE":
      return state.filter((id) => id !== action.id);
    default:
      return state;
  }
}

interface WishlistContextValue {
  wishlist: number[];
  isWishlisted: (id: number) => boolean;
  toggleWishlist: (id: number) => void;
  removeWishlist: (id: number) => void;
  addWishlistToCart: (id: number) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, undefined, readInitialWishlist);
  const { showToast } = useUI();
  const { addToCart } = useCart();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const isWishlisted = useCallback((id: number) => wishlist.includes(id), [wishlist]);

  const toggleWishlist = useCallback(
    (id: number) => {
      if (wishlist.includes(id)) {
        dispatch({ type: "REMOVE", id });
        showToast("Removed from wishlist");
      } else {
        dispatch({ type: "ADD", id });
        showToast("Added to wishlist");
      }
    },
    [wishlist, showToast],
  );

  const removeWishlist = useCallback(
    (id: number) => {
      dispatch({ type: "REMOVE", id });
      showToast("Removed from wishlist");
    },
    [showToast],
  );

  const addWishlistToCart = useCallback(
    (id: number) => {
      addToCart(id);
    },
    [addToCart],
  );

  return (
    <WishlistContext.Provider
      value={{ wishlist, isWishlisted, toggleWishlist, removeWishlist, addWishlistToCart }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
}
