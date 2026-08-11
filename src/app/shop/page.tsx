import type { Metadata } from "next";

import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop — Iris Pharma",
  description: "Browse our range of Ayurvedic herbal products.",
};

export default function ShopPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-14 sm:px-6">
      <div className="mb-8 flex flex-col items-center gap-1.5 text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
          Shop all products
        </h1>
        <p className="text-sm text-slate-500">
          {PRODUCTS.length} Ayurvedic herbal {PRODUCTS.length === 1 ? "product" : "products"} — more coming soon.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {PRODUCTS.map((product, i) => (
          <ProductCard
            key={product.slug}
            product={product}
            badge={i === 0 ? "Bestseller" : undefined}
          />
        ))}
      </div>
    </main>
  );
}
