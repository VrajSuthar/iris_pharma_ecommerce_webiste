import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { site } from "@/lib/config";

const POLICY_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/refund-policy", label: "Refund & Cancellation" },
  { href: "/shipping-policy", label: "Shipping Policy" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 px-4 py-8 text-center sm:px-6">
        <p className="text-sm font-semibold text-slate-900">
          {site.brandName}
        </p>
        <p className="max-w-sm text-sm text-slate-500">{site.address}</p>
        <a
          href={`https://wa.me/${site.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <MessageCircle className="size-4" />
          Message us on WhatsApp
        </a>

        <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
          {POLICY_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs font-medium text-slate-500 hover:text-primary hover:underline"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="mt-4 text-xs text-slate-400">
          © {new Date().getFullYear()} {site.brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
