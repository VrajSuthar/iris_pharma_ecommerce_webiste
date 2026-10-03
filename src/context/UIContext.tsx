import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface ToastState {
  message: string;
  visible: boolean;
}

interface UIContextValue {
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  quickViewProductId: number | null;
  toast: ToastState;
  openCart: () => void;
  closeCart: (hideOverlay?: boolean) => void;
  openWishlist: () => void;
  closeWishlist: (hideOverlay?: boolean) => void;
  closeOverlays: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openQuickView: (id: number) => void;
  closeQuickView: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  showToast: (message: string) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

const TOAST_DURATION_MS = 2200;

export function UIProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickViewProductId, setQuickViewProductId] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastState>({ message: "", visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const openCart = useCallback(() => {
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback((_hideOverlay = true) => {
    setIsCartOpen(false);
  }, []);

  const openWishlist = useCallback(() => {
    setIsCartOpen(false);
    setIsWishlistOpen(true);
  }, []);

  const closeWishlist = useCallback((_hideOverlay = true) => {
    setIsWishlistOpen(false);
  }, []);

  const closeOverlays = useCallback(() => {
    setIsCartOpen(false);
    setIsWishlistOpen(false);
  }, []);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const openQuickView = useCallback((id: number) => setQuickViewProductId(id), []);
  const closeQuickView = useCallback(() => setQuickViewProductId(null), []);

  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen((open) => !open),
    [],
  );
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast((current) => ({ ...current, visible: false }));
    }, TOAST_DURATION_MS);
  }, []);

  useEffect(() => {
    const anyDrawerOpen = isCartOpen || isWishlistOpen || quickViewProductId !== null;
    document.body.classList.toggle("no-scroll", anyDrawerOpen);
  }, [isCartOpen, isWishlistOpen, quickViewProductId]);

  return (
    <UIContext.Provider
      value={{
        isCartOpen,
        isWishlistOpen,
        isSearchOpen,
        isMobileMenuOpen,
        quickViewProductId,
        toast,
        openCart,
        closeCart,
        openWishlist,
        closeWishlist,
        closeOverlays,
        openSearch,
        closeSearch,
        openQuickView,
        closeQuickView,
        toggleMobileMenu,
        closeMobileMenu,
        showToast,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within a UIProvider");
  return context;
}
