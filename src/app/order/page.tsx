"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, MessageCircle, ShoppingBag } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/config";
import { useCart, type CartItem } from "@/lib/cart-context";

const orderSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),
  address: z.string().min(10, "Enter your full delivery address"),
});

type OrderInput = z.infer<typeof orderSchema>;

type PaidOrder = OrderInput & {
  paymentId: string;
  items: CartItem[];
  total: number;
};

// Autofill (and habit) commonly prepends a leading 0 or +91/91 country code
// to Indian mobile numbers — strip those so the field always holds the bare
// 10-digit number the schema expects.
function sanitizePhone(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length > 10) {
    digits = digits.slice(2);
  }
  digits = digits.replace(/^0+/, "");
  return digits.slice(0, 10);
}

// wa.me lands on a WhatsApp web page first, which shows an "Open in app?"
// banner instead of switching straight to the app. The whatsapp:// scheme
// opens the installed app directly, so prefer it on mobile where the app is
// actually installed; desktop has no app to hand off to, so keep wa.me there.
function buildWhatsAppUrl(message: string) {
  const text = encodeURIComponent(message);
  const isMobile =
    typeof navigator !== "undefined" &&
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  return isMobile
    ? `whatsapp://send?phone=${site.whatsappNumber}&text=${text}`
    : `https://wa.me/${site.whatsappNumber}?text=${text}`;
}

function buildOrderMessage(order: PaidOrder) {
  return [
    `New order — ${site.brandName}`,
    ``,
    ...order.items.map(
      ({ product, qty }) => `${product.name} × ${qty} — ₹${product.price * qty}`
    ),
    ``,
    `Total: ₹${order.total}`,
    ``,
    `Name: ${order.name}`,
    `Phone: ${order.phone}`,
    `Address: ${order.address}`,
    ``,
    `Payment: Razorpay (paid) — ${order.paymentId}`,
  ].join("\n");
}

export default function OrderPage() {
  const { items, subtotal, mrpSubtotal, clear } = useCart();
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<PaidOrder | null>(null);

  const form = useForm<OrderInput>({
    resolver: zodResolver(orderSchema),
    defaultValues: { name: "", phone: "", address: "" },
  });

  const savings = mrpSubtotal - subtotal;

  async function onSubmit(values: OrderInput) {
    setPayError(null);

    if (!window.Razorpay) {
      setPayError("Payment is still loading — try again in a moment.");
      return;
    }

    setPaying(true);
    try {
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(({ product, qty }) => ({ slug: product.slug, qty })),
          ...values,
        }),
      });
      if (!res.ok) throw new Error("create-order failed");
      const order = await res.json();

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: site.brandName,
        description: items.map(({ product, qty }) => `${product.name} × ${qty}`).join(", "),
        prefill: { name: values.name, contact: values.phone },
        theme: { color: "#00737c" },
        modal: {
          ondismiss: () => setPaying(false),
        },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const result = await verifyRes.json();
            if (!verifyRes.ok || !result.verified) {
              throw new Error("verification failed");
            }
            const paidOrder: PaidOrder = {
              ...values,
              paymentId: response.razorpay_payment_id,
              items,
              total: subtotal,
            };
            setSubmitted(paidOrder);
            clear();

            // Route straight into WhatsApp with the order pre-filled so the
            // customer only has to hit Send. Opened in a new tab (rather than
            // navigating away) so the confirmation screen below still shows
            // as a fallback if the browser blocks the popup.
            const whatsappMessage = buildOrderMessage(paidOrder);
            window.open(buildWhatsAppUrl(whatsappMessage), "_blank", "noopener,noreferrer");
          } catch {
            setPayError(
              "Payment went through but we couldn't verify it — please contact us with your payment ID before re-ordering."
            );
          } finally {
            setPaying(false);
          }
        },
      });

      razorpay.on("payment.failed", () => {
        setPayError("Payment failed or was cancelled — please try again.");
        setPaying(false);
      });

      razorpay.open();
    } catch {
      setPayError("Could not start payment. Please try again.");
      setPaying(false);
    }
  }

  if (submitted) {
    const whatsappMessage = buildOrderMessage(submitted);
    const whatsappLink = buildWhatsAppUrl(whatsappMessage);

    return (
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-5 px-4 py-16 text-center sm:px-6">
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex size-16 items-center justify-center rounded-full bg-success/10 text-success"
        >
          <CheckCircle2 className="size-9" />
        </motion.span>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Payment successful — order placed
        </h1>
        <p className="text-sm text-slate-500">
          We&apos;ve received your payment (ID <code>{submitted.paymentId}</code>).
          Send us your order details via WhatsApp so we can get it packed and
          shipped.
        </p>

        <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left text-sm text-slate-600">
          {submitted.items.map(({ product, qty }) => (
            <p key={product.slug} className="font-semibold text-slate-900">
              {product.name} × {qty}
            </p>
          ))}
          <p className="mt-2">{submitted.name}</p>
          <p>{submitted.phone}</p>
          <p>{submitted.address}</p>
          <p className="mt-2 font-semibold text-slate-900">
            Total: ₹{submitted.total} — paid
          </p>
        </div>

        <Button asChild size="lg" className="w-full rounded-full">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" />
            Send order details via WhatsApp
          </a>
        </Button>

        <Link href="/" className="text-sm font-medium text-primary hover:underline">
          Back to home
        </Link>
      </main>
    );
  }

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
          Add a product to your cart before checking out.
        </p>
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="/shop">Shop products</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-md flex-1 px-4 py-10 sm:px-6">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <div className="mb-6 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        {items.map(({ product, qty }) => (
          <div key={product.slug} className="flex items-center gap-3">
            <Image
              src={product.image}
              alt={product.name}
              width={56}
              height={56}
              className="size-14 rounded-xl object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">
                {product.name} × {qty}
              </p>
              <p className="text-xs font-semibold text-slate-900">
                ₹{product.price * qty}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    inputMode="numeric"
                    placeholder="9876543210"
                    {...field}
                    onChange={(e) =>
                      field.onChange(sanitizePhone(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="House no, street, area, city, pincode"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-1.5 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
            <div className="flex items-center justify-between text-slate-500">
              <span>MRP total</span>
              <span className="line-through">₹{mrpSubtotal}</span>
            </div>
            <div className="flex items-center justify-between text-success">
              <span>Discount</span>
              <span>−₹{savings}</span>
            </div>
            <div className="mt-1.5 flex items-center justify-between border-t border-slate-100 pt-1.5 text-base font-semibold text-slate-900">
              <span>Amount payable</span>
              <span>₹{subtotal}</span>
            </div>
          </div>

          {payError && (
            <p className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
              {payError}
            </p>
          )}

          <Button type="submit" size="lg" className="rounded-full" disabled={paying}>
            {paying ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Opening payment…
              </>
            ) : (
              `Pay ₹${subtotal} with GPay / UPI`
            )}
          </Button>
        </form>
      </Form>
    </main>
  );
}
