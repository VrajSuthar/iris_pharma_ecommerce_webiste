// Brand-level business details, shared across every product. Everything
// here is public (bundled into the client), so never put a secret in this
// file. Per-product data (name, price, images) lives in src/lib/products.ts.
export const site = {
  brandName: "Iris Pharma",
  tagline: "Ayurvedic skincare & herbal wellness, made in India",
  currency: "INR",

  // Payment is charged for real via Razorpay (see src/lib/razorpay.ts and
  // src/app/api/razorpay/*) — the settlement bank account/UPI ID is
  // configured in the Razorpay dashboard, not in this codebase.

  // No database — after a verified payment, the confirmation screen sends
  // order details (name/phone/address/payment ID) to this WhatsApp number.
  whatsappNumber: "919022022433", // country code + number, digits only

  address:
    "Shop No 14, Bhaskar Complex, Opp Sai Baba Temple, Vijaynagar, Nalasopara East - 401209, Mumbai, Maharashtra",
} as const;
