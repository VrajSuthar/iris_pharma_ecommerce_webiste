import type { ReactNode } from "react";
import { UIProvider } from "./UIContext";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { OrderProvider } from "./OrderContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <UIProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>{children}</OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </UIProvider>
  );
}
