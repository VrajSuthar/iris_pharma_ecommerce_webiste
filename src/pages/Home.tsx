import { Hero } from "../components/home/Hero";
import { Marquee } from "../components/home/Marquee";
import { Reveal } from "../components/common/Reveal";
import { SectionLabel } from "../components/common/SectionLabel";
import { Button } from "../components/common/Button";
import { ProductGrid } from "../components/shop/ProductGrid";
import { products } from "../data/products";

const FEATURED_PRODUCTS = products.slice(0, 4);
const NEW_ARRIVALS = products.slice(4, 8);

export function Home() {
  return (
    <>
      <Hero />
      <Marquee />

      <section className="px-[5vw] max-mobile:px-[6vw] py-[140px] bg-white-warm">
        <Reveal className="text-center mb-[50px]">
          <SectionLabel>Bestsellers</SectionLabel>
          <h2 className="font-serif text-[clamp(55px,7vw,95px)] leading-[.85] font-normal -tracking-[.05em] mt-[18px]">
            Loved by many.
          </h2>
        </Reveal>

        <ProductGrid products={FEATURED_PRODUCTS} />

        <div className="flex justify-center mt-[50px]">
          <Button to="/shop">Shop All Products</Button>
        </div>
      </section>

      <section className="px-[5vw] max-mobile:px-[6vw] py-[140px] bg-cream-dark">
        <Reveal className="text-center mb-[50px]">
          <SectionLabel>New In</SectionLabel>
          <h2 className="font-serif text-[clamp(55px,7vw,95px)] leading-[.85] font-normal -tracking-[.05em] mt-[18px]">
            Fresh arrivals.
          </h2>
        </Reveal>

        <ProductGrid products={NEW_ARRIVALS} />

        <div className="flex justify-center mt-[50px]">
          <Button to="/shop">Shop All Products</Button>
        </div>
      </section>
    </>
  );
}
