import { NextResponse } from "next/server";

import { getRazorpayClient } from "@/lib/razorpay";
import { site } from "@/lib/config";

// Razorpay caps each note value at 256 characters.
function noteValue(value: unknown): string | undefined {
  return typeof value === "string" && value.trim()
    ? value.trim().slice(0, 256)
    : undefined;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const qty = Number(body?.qty);

  if (!Number.isInteger(qty) || qty < 1 || qty > 50) {
    return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
  }

  // Price is looked up server-side from config, never trusted from the
  // client, so a tampered request can't change what actually gets charged.
  const amountPaise = site.price * qty * 100;

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
        product: site.productName,
        qty: String(qty),
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
