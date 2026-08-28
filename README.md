<p align="center">
  <img src="site/assets/images/logo.png" alt="Iris Pharma logo" width="120" />
</p>

<h1 align="center">Iris Pharma</h1>

<p align="center">
  A static HTML/CSS/vanilla-JS storefront for <strong>Iris Pharma</strong>
  Ayurvedic skincare products, sold by Iris Pharma (Opposite Sai Baba
  Mandir, Nalasopara East, Palghar, Maharashtra).
</p>

---

## What this is

A static HTML/CSS/vanilla-JS storefront (no framework, no build step for
the frontend) with two small serverless functions for online payments.
Checkout offers two paths:

- **Pay online** via Razorpay (cards, UPI, netbanking) — verified server-side.
- **WhatsApp checkout** — the original flow: cart + delivery details are
  sent straight to the brand's WhatsApp number, payment (UPI/cash)
  confirmed by chat.

See **`site/README.md`** for the frontend's folder structure and conventions.

## Tech stack

- Static HTML + CSS + vanilla JavaScript (no framework, no build tooling)
- `localStorage`-backed cart, shared across pages via `site/assets/js/cart.js`
- WhatsApp checkout via `site/assets/js/whatsapp.js`
- Razorpay checkout via `/api/razorpay/*` — plain Vercel Functions (Node.js,
  no framework, no SDK — calls Razorpay's REST API directly with `fetch`)

## Razorpay setup

The `/api/razorpay/create-order` and `/api/razorpay/verify-payment`
functions need two environment variables, from your
[Razorpay Dashboard → Settings → API Keys](https://dashboard.razorpay.com/app/keys)
(use the **Test Mode** keys while developing):

```
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
```

Set them with `vercel env add RAZORPAY_KEY_ID` / `vercel env add
RAZORPAY_KEY_SECRET` (or in the Vercel dashboard → Project → Settings →
Environment Variables) — never commit real keys. See `.env.example`.

Both functions recompute the order amount (and any promo-code discount)
server-side from `site/assets/js/data.js` / `promo.js` — a tampered client
request can't change what actually gets charged, and payment signatures are
verified with a timing-safe HMAC check before an order is treated as paid.

### Running locally

```bash
npm i -g vercel   # once
vercel dev
```

`vercel dev` serves the static `site/` folder *and* the `/api` functions
together on one local port — a plain static server (`python3 -m
http.server`, `npx serve`) only serves the static files, so `/api/*` calls
will 404 there.

## Promo codes

Dummy promo codes are wired up for testing the discount flow:

| Code | Discount |
|------|----------|
| `SAVE10` | ₹10 off |
| `ADMINVRAJ` | 90% off |

Defined in `site/assets/js/promo.js` (used by both the cart/checkout UI and
the Razorpay order-creation function, so the discount is always the same on
both sides).

## Editing the business details

Brand-level details (WhatsApp number, address, tagline) live in
**`site/assets/js/config.js`**. Product data (name, price, images,
description) lives in **`site/assets/js/data.js`**.

Product photos are in `site/assets/images/`.

## Design system

See **`docs/DESIGN_SYSTEM.md`** for brand color tokens and usage rules.
