import { NextResponse } from "next/server";

import { getRazorpayClient } from "@/lib/razorpay";
import { site } from "@/lib/config";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const qty = Number(body?.qty);

  if (!Number.isInteger(qty) || qty < 1 || qty > 50) {
    return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
  }

  // Price is looked up server-side from config, never trusted from the
  // client, so a tampered request can't change what actually gets charged.
  const amountPaise = site.price * qty * 100;

  try {
    const order = await getRazorpayClient().orders.create({
      amount: amountPaise,
      currency: site.currency,
      receipt: `order_rcpt_${Date.now()}`,
      notes: { product: site.productName, qty: String(qty) },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay create-order failed", error);
    return NextResponse.json(
      { error: "Could not create payment order" },
      { status: 502 }
    );
  }
}
