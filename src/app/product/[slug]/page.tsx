import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MessageCircle, ShieldCheck, Truck } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ProductBuyBox } from "@/components/product-buy-box";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { PromoBadge } from "@/components/promo-badge";
import { discountPercent, getProduct, PRODUCTS } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Iris Pharma`,
    description: product.tagline,
  };
}

const TRUST_ROW = [
  { icon: ShieldCheck, text: "Secure Razorpay checkout" },
  { icon: Truck, text: "Ships pan-India" },
  { icon: MessageCircle, text: "Real support on WhatsApp" },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const percent = discountPercent(product);
  const related = PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-6 flex items-center gap-1 text-xs font-medium text-slate-500">
        <Link href="/shop" className="hover:text-primary">
          Shop
        </Link>
        <ChevronRight className="size-3" />
        <span className="truncate text-slate-700">{product.name}</span>
      </nav>

      <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
        <ProductGallery images={product.gallery} alt={product.name} />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">
              {product.category}
            </p>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              {product.name}
            </h1>
            <p className="text-sm text-slate-500">{product.tagline}</p>
          </div>

          {product.promoTag && <PromoBadge label={product.promoTag} />}

          <div className="flex items-center gap-2.5">
            <span className="text-3xl font-bold text-slate-900">
              ₹{product.price}
            </span>
            <span className="text-base text-slate-400 line-through">
              ₹{product.mrp}
            </span>
            <Badge className="rounded-full bg-primary text-primary-foreground">
              {percent}% OFF
            </Badge>
          </div>

          <ProductBuyBox product={product} />

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-slate-200 pt-4">
            {TRUST_ROW.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-500"
              >
                <Icon className="size-3.5 text-primary" />
                {text}
              </span>
            ))}
          </div>

          <p className="text-sm leading-relaxed text-slate-600">
            {product.description}
          </p>
        </div>
      </div>

      <section className="mt-14 border-t border-slate-200 pt-10">
        <h2 className="mb-5 text-xl font-extrabold tracking-tight text-primary">
          How to use {product.name}
        </h2>
        <ol className="flex flex-col gap-4 sm:max-w-md">
          {product.howToUse.map((text, i) => (
            <li key={text} className="flex items-start gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {i + 1}
              </span>
              <p className="pt-0.5 text-sm leading-relaxed text-slate-600">
                {text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 border-t border-slate-200 pt-10">
        <h2 className="mb-5 text-xl font-extrabold tracking-tight text-primary">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="use">
            <AccordionTrigger>Is it safe for daily use?</AccordionTrigger>
            <AccordionContent>
              It&apos;s made for regular topical use as directed above. If you
              have sensitive skin or a pre-existing condition, do a patch
              test first and consult a doctor before use.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="pay">
            <AccordionTrigger>How do I pay and place an order?</AccordionTrigger>
            <AccordionContent>
              Add this product to your cart, tap checkout, fill in your
              delivery details, and pay securely via Razorpay (UPI, GPay,
              cards or net banking). Once payment is confirmed, we&apos;ll ask
              you to send the order to us on WhatsApp so we can get it packed
              and shipped.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="cod">
            <AccordionTrigger>Is Cash on Delivery available?</AccordionTrigger>
            <AccordionContent>
              Not currently — orders are prepaid online via Razorpay. This
              keeps checkout quick and your payment secure.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {related.length > 0 && (
        <section className="mt-14 border-t border-slate-200 pt-10">
          <h2 className="mb-5 text-xl font-extrabold tracking-tight text-primary">
            You may also like
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
