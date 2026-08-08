<p align="center">
  <img src="public/logo.png" alt="Iris Pharma logo" width="120" />
</p>

<h1 align="center">Derma 555 Malam — Iris Pharma</h1>

<p align="center">
  A single-product landing + order page for <strong>Derma 555 Malam</strong>,
  sold by <strong>Iris Pharma</strong> (Opposite Sai Baba Mandir, Nalasopara
  East, Palghar, Maharashtra).
</p>

---

## What this is

A single-product storefront with real payments:

- `/` — product landing page (photos, benefits, how to use, price).
- `/order` — order form (name, phone, address) + a **Pay with GPay / UPI**
  button that opens Razorpay Checkout straight into the UPI app picker.

There's no database or admin dashboard, but payment is real: `/order`
creates a Razorpay order server-side, opens Checkout scoped to UPI intent
(so it goes straight to "choose your UPI app" — GPay, PhonePe, etc.), and
verifies the payment signature server-side before showing "order placed".
Nothing is marked paid on trust. After a verified payment, the confirmation
screen offers a **Send order details via WhatsApp** button (order info +
Razorpay payment ID pre-filled) so you receive it.

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 + shadcn/Radix UI primitives
- React Hook Form + Zod (order form validation)
- Razorpay Checkout + Orders API (`src/lib/razorpay.ts`,
  `src/app/api/razorpay/*`) — payment creation and signature verification

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Razorpay keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Payment setup (Razorpay)

1. Create a [Razorpay](https://dashboard.razorpay.com/) account (test mode
   works with no business verification).
2. Dashboard → **Settings → API Keys** → generate a key pair.
3. Copy `.env.example` to `.env.local` and fill in:
   - `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` — server-only, used to
     create orders and verify payment signatures.
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` — same key ID, exposed to the browser
     (required by Razorpay Checkout; the secret is never exposed).
4. Test mode keys (`rzp_test_...`) let you complete the full flow without
   moving real money. Switch to live keys (`rzp_live_...`, requires KYC)
   when you're ready to accept real payments.
5. `.env.local` is gitignored — never commit real keys.

## Editing the business details

Everything specific to the product/store lives in one file:
**`src/lib/config.ts`**

| Field             | What it controls                                      |
| ------------------ | ------------------------------------------------------ |
| `price`            | Product price shown on both pages and charged via Razorpay |
| `whatsappNumber`    | WhatsApp number used by both the footer and the post-payment order-details message |
| `address`           | Shown in the footer                                     |

The settlement bank account / UPI ID that receives payments is configured
in the Razorpay dashboard, not in this codebase — see **Payment setup**
above.

Product photos are in `public/derma-555/` — replace those files (same
names) to update the images used on both pages.

## Project structure

```
src/app/page.tsx                    Product landing page
src/app/order/page.tsx              Order form, Razorpay Checkout, WhatsApp confirmation
src/app/api/razorpay/create-order   Creates a Razorpay order (server-side, trusted price)
src/app/api/razorpay/verify         Verifies the payment signature (server-side)
src/lib/razorpay.ts                 Server-only Razorpay SDK client
src/components/site-header.tsx / site-footer.tsx   Shared chrome
src/lib/config.ts                   Editable business details (price, contact)
src/components/ui/                  shadcn UI primitives (button, input, form, card, badge…)
docs/DESIGN_SYSTEM.md               Brand color tokens and usage rules
```

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
