"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, subtotal, mrpSubtotal, setQty, removeItem } = useCart();
  const savings = mrpSubtotal - subtotal;

  if (items.length === 0) {
    return (
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-4 px-4 py-16 text-center sm:px-6">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShoppingBag className="size-6" />
        </span>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Your cart is empty
        </h1>
        <p className="text-sm text-slate-500">
          Browse our products and add something you like.
        </p>
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="/shop">Shop products</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
        Your cart
      </h1>

      <div className="flex flex-col gap-3">
        {items.map(({ product, qty }) => (
          <div
            key={product.slug}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={56}
              height={56}
              className="size-14 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                {product.name}
              </p>
              <p className="text-xs text-slate-500">₹{product.price} each</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                className="rounded-full"
                onClick={() => setQty(product.slug, qty - 1)}
                aria-label={`Decrease ${product.name} quantity`}
              >
                <Minus className="size-3.5" />
              </Button>
              <span className="w-4 text-center text-sm font-medium">{qty}</span>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                className="rounded-full"
                onClick={() => setQty(product.slug, qty + 1)}
                aria-label={`Increase ${product.name} quantity`}
              >
                <Plus className="size-3.5" />
              </Button>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="rounded-full text-slate-400 hover:text-destructive"
              onClick={() => removeItem(product.slug)}
              aria-label={`Remove ${product.name} from cart`}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-1.5 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
        <div className="flex items-center justify-between text-slate-500">
          <span>MRP total</span>
          <span className="line-through">₹{mrpSubtotal}</span>
        </div>
        <div className="flex items-center justify-between text-success">
          <span>Discount</span>
          <span>−₹{savings}</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between border-t border-slate-100 pt-1.5 text-base font-semibold text-slate-900">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
      </div>

      <Button asChild size="lg" className="mt-4 w-full rounded-full">
        <Link href="/order">Checkout</Link>
      </Button>
    </main>
  );
}
