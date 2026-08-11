import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";

import { site } from "@/lib/config";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/cart", label: "Cart" },
  { href: "/#faq", label: "FAQ" },
];

const POLICY_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/refund-policy", label: "Refund & Cancellation" },
  { href: "/shipping-policy", label: "Shipping Policy" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#00373d] text-white">
      <div className="mx-auto grid w-full max-w-3xl gap-8 px-4 py-10 sm:grid-cols-[1.2fr_1fr_1fr_1fr] sm:px-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="relative size-8 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-white/20">
              <Image src="/logo.png" alt="" fill className="object-contain p-0.5" />
            </span>
            <span className="text-base font-bold tracking-tight">
              {site.brandName}
            </span>
          </div>
          <p className="max-w-xs text-sm text-white/70">{site.tagline}</p>
          <a
            href={`https://wa.me/${site.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-white hover:underline"
          >
            <MessageCircle className="size-4" />
            Message us on WhatsApp
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold tracking-wide text-amber-400 uppercase">
            Quick links
          </p>
          {QUICK_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-white/80 hover:text-white hover:underline"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold tracking-wide text-amber-400 uppercase">
            Support
          </p>
          <a
            href={`https://wa.me/${site.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-1.5 text-sm text-white/80 hover:text-white"
          >
            <MessageCircle className="mt-0.5 size-3.5 shrink-0" />
            WhatsApp support
          </a>
          <p className="flex items-start gap-1.5 text-sm text-white/80">
            <MapPin className="mt-0.5 size-3.5 shrink-0" />
            {site.address}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold tracking-wide text-amber-400 uppercase">
            Payments
          </p>
          <p className="text-sm text-white/80">UPI (GPay / PhonePe)</p>
          <p className="text-sm text-white/80">Debit / Credit cards</p>
          <p className="text-sm text-white/80">Net banking</p>
          <p className="text-xs text-white/50">Secured by Razorpay</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-2 px-4 py-5 text-center sm:flex-row sm:justify-between sm:px-6">
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            {POLICY_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs font-medium text-white/60 hover:text-white hover:underline"
              >
                {label}
              </Link>
            ))}
          </nav>
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {site.brandName}. All rights reserved.
          </p>
        </div>
        <p className="pb-5 text-center text-xs text-white/40">
          Made with care for healthy skin across India.
        </p>
      </div>
    </footer>
  );
}
