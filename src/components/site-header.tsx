import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { discountPercent } from "@/lib/config";

const NAV_LINKS = [
  { href: "/#how-to-use", label: "How to use" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30">
      <div className="flex items-center justify-center gap-1.5 bg-primary px-4 py-2 text-center text-xs font-medium text-primary-foreground">
        <ShieldCheck className="size-3.5 shrink-0" />
        <span>
          Flat {discountPercent}% off, today only — secure payment via Razorpay
        </span>
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

          <nav className="hidden items-center gap-6 sm:flex">
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

          <Button asChild size="sm" className="rounded-full">
            <Link href="/order">Buy now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
