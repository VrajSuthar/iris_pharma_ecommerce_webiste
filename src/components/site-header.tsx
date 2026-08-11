"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ShoppingCart } from "lucide-react";

import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-30">
      <div className="flex items-center justify-center gap-1.5 bg-[#00373d] px-4 py-2 text-center text-xs font-medium text-white">
        <ShieldCheck className="size-3.5 shrink-0 text-white/80" />
        <span>100% Ayurvedic herbal products · Secure Razorpay checkout</span>
      </div>

      <div className="border-b border-slate-200 bg-white/90 shadow-sm shadow-slate-900/[0.02] backdrop-blur-lg">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="relative size-9 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-slate-200 transition-shadow group-hover:ring-primary/40">
              <Image
                src="/logo.png"
                alt="Iris Pharma"
                fill
                className="object-contain p-0.5"
              />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-base font-bold tracking-tight text-slate-900">
                Iris Pharma
              </span>
              <span className="text-[10px] font-medium tracking-wide text-slate-400 uppercase">
                Ayurvedic • Trust • Care
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-5">
            <nav className="flex items-center gap-5">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium text-slate-600 hover:text-primary"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <Link
              href="/cart"
              className="relative flex size-8 items-center justify-center rounded-full text-slate-600 hover:bg-primary/10 hover:text-primary"
              aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
            >
              <ShoppingCart className="size-4.5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
