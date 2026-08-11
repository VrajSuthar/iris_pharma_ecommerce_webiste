import type { Metadata } from "next";

import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop — Iris Pharma",
  description: "Browse our range of Ayurvedic herbal products.",
};

export default function ShopPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Shop all products
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {PRODUCTS.length} Ayurvedic herbal {PRODUCTS.length === 1 ? "product" : "products"} — more coming soon.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </main>
  );
}
