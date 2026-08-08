import Razorpay from "razorpay";

// Server-only. Reads RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET from the
// environment — never import this file from a client component.
let client: Razorpay | null = null;

export function getRazorpayClient() {
  if (client) return client;

  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error(
      "Missing RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET. Copy .env.example to .env.local and fill in your Razorpay keys."
    );
  }

  client = new Razorpay({ key_id, key_secret });
  return client;
}
