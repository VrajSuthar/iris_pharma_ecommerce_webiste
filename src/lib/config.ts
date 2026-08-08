// Single place to edit the store's business details. Everything here is
// public (bundled into the client), so never put a secret in this file.
export const site = {
  productName: "Derma 555 Malam",
  brandName: "Iris Pharma",
  tagline: "Ayurvedic relief from ringworm, itching & fungal infections",
  price: 130, // INR — what the customer pays
  mrp: 140, // INR — struck-through "MRP" shown next to the discounted price
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

export const discountPercent = Math.round(
  ((site.mrp - site.price) / site.mrp) * 100
);
