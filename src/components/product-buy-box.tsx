"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";

export function ProductBuyBox({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-2 sm:justify-start">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="rounded-full"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
        >
          <Minus className="size-3.5" />
        </Button>
        <span className="w-6 text-center text-sm font-semibold">{qty}</span>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="rounded-full"
          onClick={() => setQty((q) => q + 1)}
          aria-label="Increase quantity"
        >
          <Plus className="size-3.5" />
        </Button>
      </div>

      <Button
        type="button"
        size="lg"
        variant="outline"
        className="flex-1 rounded-full"
        onClick={() => {
          addItem(product.slug, qty);
          toast.success(`${product.name} added to cart`);
        }}
      >
        <ShoppingCart className="size-4" />
        Add to cart
      </Button>

      <Button
        type="button"
        size="lg"
        className="flex-1 rounded-full"
        onClick={() => {
          addItem(product.slug, qty);
          router.push("/order");
        }}
      >
        Buy now
      </Button>
    </div>
  );
}
