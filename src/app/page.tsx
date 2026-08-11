"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgePercent,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Truck,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/lib/cart-context";
import { site } from "@/lib/config";
import { discountPercent, PRODUCTS } from "@/lib/products";

const flagship = PRODUCTS[0];

const CONDITIONS = ["Ringworm", "Scabies", "Itching", "Cracked skin", "Fungal infection"];

const HIGHLIGHTS = [
  { title: "100% Herbal", subtitle: "Ayurvedic & safe ingredients" },
  { title: "Natural Formula", subtitle: "Made with pure herbal extracts" },
  { title: "Skin Protection", subtitle: "Protects skin, prevents infection" },
  { title: "Fast Relief", subtitle: "Eases itching, burning & dryness" },
];

const TRUST_POINTS = [
  {
    icon: Leaf,
    iconClass: "bg-primary/10 text-primary",
    title: "100% herbal formula",
    text: "Made with natural Ayurvedic herbs — no harsh chemicals.",
  },
  {
    icon: ShieldCheck,
    iconClass: "bg-sky-100 text-sky-600",
    title: "Secure checkout",
    text: "Every order is paid for safely through Razorpay.",
  },
  {
    icon: Truck,
    iconClass: "bg-amber-100 text-amber-600",
    title: "Ships pan-India",
    text: "Packed with care and dispatched across the country.",
  },
  {
    icon: MessageCircle,
    iconClass: "bg-violet-100 text-violet-600",
    title: "Real support",
    text: "Reach a real person on WhatsApp, not a bot.",
  },
];

const FAQS = [
  {
    q: `What is ${flagship.name} used for?`,
    a: "It's an Ayurvedic ointment formulated for ringworm, scabies, itching, cracked skin and fungal skin infections. See the “How to use” section above for application instructions.",
  },
  {
    q: "Is it safe for daily use?",
    a: "It's made with natural herbal ingredients for topical use up to three times a day. If you have sensitive skin or a pre-existing condition, do a patch test first and consult a doctor before use.",
  },
  {
    q: "How do I pay and place an order?",
    a: "Add a product to your cart, tap checkout, fill in your delivery details, and pay securely via Razorpay (UPI, GPay, cards or net banking). Once payment is confirmed, we'll ask you to send the order to us on WhatsApp so we can get it packed and shipped.",
  },
  {
    q: "Is Cash on Delivery available?",
    a: "Not currently — orders are prepaid online via Razorpay. This keeps checkout quick and your payment secure.",
  },
  {
    q: "Need help with an order?",
    a: "Message us on WhatsApp any time — the link is in the footer below — and we'll help you out.",
  },
];

const STEPS = [
  { step: "1", text: "Clean the affected area well and pat it dry." },
  { step: "2", text: `Gently apply a thin layer of ${flagship.name}, three times a day.` },
  {
    step: "3",
    text: "For dry or cracked heels, apply generously and wear socks overnight for best results.",
  },
];

export default function HomePage() {
  const { count, subtotal } = useCart();
  const flagshipDiscount = discountPercent(flagship);

  return (
    <main className="flex flex-1 flex-col pb-24 sm:pb-0">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center">
          <div className="mt-[-6rem] size-[26rem] rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="mx-auto grid w-full max-w-3xl items-center gap-10 px-4 py-10 sm:grid-cols-2 sm:px-6 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="order-2 flex flex-col gap-4 text-center sm:order-1 sm:text-left"
          >
            <p className="text-xs font-bold tracking-widest text-primary uppercase">
              Ayurvedic • Made in India
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Pure Ayurvedic Care, Delivered
            </h1>
            <p className="mx-auto max-w-md text-slate-600 sm:mx-0">{site.tagline}</p>

            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
              {CONDITIONS.map((c) => (
                <Badge key={c} variant="secondary" className="rounded-full">
                  {c}
                </Badge>
              ))}
            </div>

            <div className="mt-2 flex flex-col items-center gap-3 sm:items-start">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <Button asChild size="lg" className="group/cta rounded-full px-8">
                  <Link href="/shop">
                    Shop now
                    <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                  <Link href="#how-to-use">How to use</Link>
                </Button>
              </div>

              <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <ShieldCheck className="size-3.5 text-primary" />
                Secure Razorpay checkout · Ships pan-India
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="relative order-1 overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_-24px_rgba(15,23,42,0.25)] ring-1 ring-slate-200 sm:order-2"
          >
            <Image
              src={flagship.image}
              alt={flagship.name}
              width={1063}
              height={1500}
              priority
              className="h-auto w-full object-cover"
            />
            <div className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/30">
              <BadgePercent className="size-3.5" />
              Bestseller · {flagshipDiscount}% OFF
            </div>
          </motion.div>
        </div>
      </section>

      <section id="shop" className="scroll-mt-24 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <h2 className="text-lg font-semibold text-slate-900">Shop our products</h2>
          <p className="mb-4 text-sm text-slate-500">
            {PRODUCTS.length} Ayurvedic herbal {PRODUCTS.length === 1 ? "product" : "products"} — more coming soon.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-8 px-4 py-10 sm:grid-cols-4 sm:px-6">
          {HIGHLIGHTS.map(({ title, subtitle }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left"
            >
              <p className="text-sm font-bold text-primary">{title}</p>
              <p className="text-xs text-slate-500">{subtitle}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Product photos</h2>
        <div className="grid grid-cols-3 gap-3">
          {flagship.gallery.map((src) => (
            <div
              key={src}
              className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md"
            >
              <Image
                src={src}
                alt={flagship.name}
                width={400}
                height={400}
                className="aspect-square h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      <section id="how-to-use" className="scroll-mt-24 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">How to use {flagship.name}</h2>
          <ol className="flex flex-col gap-4">
            {STEPS.map(({ step, text }) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {step}
                </span>
                <p className="pt-0.5 text-sm leading-relaxed text-slate-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-stone-50">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <h2 className="mb-1 text-lg font-semibold text-slate-900">
            Why people trust Iris Pharma
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            No fluff — just what you actually get.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {TRUST_POINTS.map(({ icon: Icon, iconClass, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex flex-col gap-2 rounded-2xl bg-white p-4 ring-1 ring-slate-200"
              >
                <span className={`flex size-9 items-center justify-center rounded-full ${iconClass}`}>
                  <Icon className="size-4.5" />
                </span>
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="text-xs leading-relaxed text-slate-500">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map(({ q, a }) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {count > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-lg sm:hidden">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-slate-500">
                {count} item{count === 1 ? "" : "s"} in cart
              </span>
              <span className="text-lg font-bold text-slate-900">₹{subtotal}</span>
            </div>
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/order">Checkout</Link>
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
