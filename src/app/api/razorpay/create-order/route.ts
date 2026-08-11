import { NextResponse } from "next/server";

import { getRazorpayClient } from "@/lib/razorpay";
import { site } from "@/lib/config";
import { getProduct, type Product } from "@/lib/products";

// Razorpay caps each note value at 256 characters.
function noteValue(value: unknown): string | undefined {
  return typeof value === "string" && value.trim()
    ? value.trim().slice(0, 256)
    : undefined;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const rawItems: unknown[] = Array.isArray(body?.items) ? body.items : [];

  type Line = { product: Product; qty: number };

  // Every line is resolved against the server-side product catalog — slug
  // and qty are the only things trusted from the client. Price is always
  // looked up here, never taken from the request, so a tampered request
  // can't change what actually gets charged.
  const lines: Line[] = rawItems
    .map((item: unknown): Line | null => {
      const slug = (item as { slug?: unknown })?.slug;
      const qty = Number((item as { qty?: unknown })?.qty);
      if (typeof slug !== "string" || !Number.isInteger(qty) || qty < 1 || qty > 50) {
        return null;
      }
      const product = getProduct(slug);
      return product ? { product, qty } : null;
    })
    .filter((line): line is Line => line !== null);

  if (lines.length === 0) {
    return NextResponse.json({ error: "Cart is empty or invalid" }, { status: 400 });
  }

  const amountPaise = lines.reduce(
    (sum, { product, qty }) => sum + product.price * qty * 100,
    0
  );

  // Name/phone/address are informational only (shown in the Razorpay
  // Dashboard so the order can be fulfilled even if the customer never
  // sends the WhatsApp confirmation) — never trusted for pricing.
  const name = noteValue(body?.name);
  const phone = noteValue(body?.phone);
  const address = noteValue(body?.address);

  try {
    const order = await getRazorpayClient().orders.create({
      amount: amountPaise,
      currency: site.currency,
      receipt: `order_rcpt_${Date.now()}`,
      notes: {
        items: lines.map(({ product, qty }) => `${product.name} x${qty}`).join(", ").slice(0, 256),
        ...(name && { name }),
        ...(phone && { phone }),
        ...(address && { address }),
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay create-order failed", error);
    const statusCode =
      error && typeof error === "object" && "statusCode" in error
        ? Number((error as { statusCode: unknown }).statusCode)
        : undefined;
    const status = statusCode === 401 ? 401 : 502;
    return NextResponse.json(
      { error: "Could not create payment order" },
      { status }
    );
  }
}
