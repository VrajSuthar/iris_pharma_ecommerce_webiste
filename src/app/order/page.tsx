"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  MessageCircle,
  Minus,
  Plus,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { discountPercent, site } from "@/lib/config";

const orderSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),
  address: z.string().min(10, "Enter your full delivery address"),
});

type OrderInput = z.infer<typeof orderSchema>;

type PaidOrder = OrderInput & { paymentId: string };

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

function buildOrderMessage(order: PaidOrder, qty: number, total: number) {
  return [
    `New order — ${site.productName}`,
    ``,
    `Quantity: ${qty}`,
    `Total: ₹${total}`,
    ``,
    `Name: ${order.name}`,
    `Phone: ${order.phone}`,
    `Address: ${order.address}`,
    ``,
    `Payment: Razorpay (paid) — ${order.paymentId}`,
  ].join("\n");
}

export default function OrderPage() {
  const [qty, setQty] = useState(1);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<PaidOrder | null>(null);

  const form = useForm<OrderInput>({
    resolver: zodResolver(orderSchema),
    defaultValues: { name: "", phone: "", address: "" },
  });

  const total = site.price * qty;
  const mrpTotal = site.mrp * qty;
  const savings = mrpTotal - total;

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
        body: JSON.stringify({ qty, ...values }),
      });
      if (!res.ok) throw new Error("create-order failed");
      const order = await res.json();

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: site.brandName,
        description: `${site.productName} × ${qty}`,
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
            const paidOrder = { ...values, paymentId: response.razorpay_payment_id };
            setSubmitted(paidOrder);

            // Route straight into WhatsApp with the order pre-filled so the
            // customer only has to hit Send. Opened in a new tab (rather than
            // navigating away) so the confirmation screen below still shows
            // as a fallback if the browser blocks the popup.
            const whatsappMessage = buildOrderMessage(paidOrder, qty, total);
            window.open(
              `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
              "_blank",
              "noopener,noreferrer"
            );
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
    const message = buildOrderMessage(submitted, qty, total);
    const whatsappLink = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

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
          <p className="font-semibold text-slate-900">
            {site.productName} × {qty}
          </p>
          <p>{submitted.name}</p>
          <p>{submitted.phone}</p>
          <p>{submitted.address}</p>
          <p className="mt-2 font-semibold text-slate-900">Total: ₹{total} — paid</p>
        </div>

        <Button asChild size="lg" className="w-full rounded-full">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" />
            Send order details via WhatsApp
          </a>
        </Button>

        <Link href="/" className="text-sm font-medium text-primary hover:underline">
          Back to product
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-md flex-1 px-4 py-10 sm:px-6">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <Image
          src="/derma-555/pack-and-jar.jpg"
          alt={site.productName}
          width={56}
          height={56}
          className="size-14 rounded-xl object-cover"
        />
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-900">
            {site.productName}
          </p>
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-semibold text-slate-900">₹{site.price} each</p>
            <p className="text-xs text-slate-400 line-through">₹{site.mrp}</p>
            <Badge className="rounded-full bg-success/10 px-1.5 py-0 text-[10px] text-success">
              {discountPercent}% off
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="rounded-full"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            <Minus className="size-3.5" />
          </Button>
          <span className="w-4 text-center text-sm font-medium">{qty}</span>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="rounded-full"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="size-3.5" />
          </Button>
        </div>
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
              <span className="line-through">₹{mrpTotal}</span>
            </div>
            <div className="flex items-center justify-between text-success">
              <span>Discount ({discountPercent}% off)</span>
              <span>−₹{savings}</span>
            </div>
            <div className="mt-1.5 flex items-center justify-between border-t border-slate-100 pt-1.5 text-base font-semibold text-slate-900">
              <span>Amount payable</span>
              <span>₹{total}</span>
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
              `Pay ₹${total} with GPay / UPI`
            )}
          </Button>
        </form>
      </Form>
    </main>
  );
}
