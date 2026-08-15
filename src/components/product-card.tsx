"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PromoBadge } from "@/components/promo-badge";
import { useCart } from "@/lib/cart-context";
import { discountPercent, type Product } from "@/lib/products";

export function ProductCard({
  product,
  badge,
}: {
  product: Product;
  badge?: string;
}) {
  const { addItem } = useCart();
  const percent = discountPercent(product);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition-shadow hover:shadow-md">
      {badge && (
        <p className="bg-primary py-1 text-center text-[10px] font-bold tracking-wide text-primary-foreground uppercase">
          {badge}
        </p>
      )}
      <Link href={`/product/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 640px) 25vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge className="absolute top-2 left-2 rounded-full bg-primary text-primary-foreground">
            {percent}% OFF
          </Badge>
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-3.5 pb-0">
          <p className="text-[11px] font-semibold tracking-wide text-primary uppercase">
            {product.category}
          </p>
          <h3 className="text-sm font-semibold text-slate-900">{product.name}</h3>
          <p className="line-clamp-2 text-xs text-slate-500">{product.tagline}</p>
          {product.promoTag && (
            <div className="pt-0.5">
              <PromoBadge label={product.promoTag} />
            </div>
          )}
        </div>
      </Link>

      <div className="flex items-center justify-between gap-2 p-3.5 pt-2">
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-bold text-slate-900">
            ₹{product.price}
          </span>
          <span className="text-xs text-slate-400 line-through">
            ₹{product.mrp}
          </span>
        </div>
        <Button
          type="button"
          size="sm"
          className="rounded-full"
          onClick={() => {
            addItem(product.slug);
            toast.success(`${product.name} added to cart`);
          }}
        >
          <ShoppingCart className="size-3.5" />
          Add
        </Button>
      </div>
    </div>
  );
}
