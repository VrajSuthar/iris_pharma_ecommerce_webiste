import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 shadow-sm shadow-slate-900/[0.02] backdrop-blur-lg">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="relative size-9 overflow-hidden rounded-full bg-white ring-1 ring-slate-200 transition-shadow group-hover:ring-primary/40">
            <Image
              src="/logo.png"
              alt="Iris Pharma"
              fill
              className="object-contain p-0.5"
            />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Iris Pharma
          </span>
        </Link>
        <Button asChild size="sm" className="rounded-full">
          <Link href="/order">Buy now</Link>
        </Button>
      </div>
    </header>
  );
}
