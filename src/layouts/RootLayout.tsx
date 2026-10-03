import { Loader } from "../components/layout/Loader";
import { CustomCursor } from "../components/layout/CustomCursor";
import { Navbar } from "../components/layout/Navbar";
import { PageTransition } from "../components/layout/PageTransition";
import { Footer } from "../components/layout/Footer";
import { Overlay } from "../components/common/Overlay";
import { Toast } from "../components/common/Toast";
import { CartDrawer } from "../components/cart/CartDrawer";
import { WishlistDrawer } from "../components/wishlist/WishlistDrawer";
import { SearchModal } from "../components/search/SearchModal";
import { QuickViewModal } from "../components/product/QuickViewModal";

export function RootLayout() {
  return (
    <>
      <Loader />
      <CustomCursor />
      <Navbar />

      <div className="min-h-screen flex flex-col">
        <main className="flex-1 pt-[82px] max-mobile:pt-[72px]">
          <PageTransition />
        </main>

        <Footer />
      </div>

      <Overlay />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <QuickViewModal />
      <Toast />
    </>
  );
}
