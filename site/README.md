# Iris Pharma — static site

Plain HTML/CSS/vanilla JS frontend. No framework, no build step. Checkout
also calls two small Vercel serverless functions for Razorpay payments —
see `../README.md` at the project root and `../api/razorpay/`.

## Folder structure

```
site/
├── index.html                  Home
├── shop.html                   Product listing
├── cart.html                   Cart
├── order.html                  Checkout (WhatsApp)
├── privacy-policy.html
├── terms-and-conditions.html
├── refund-policy.html
├── shipping-policy.html
├── products/
│   ├── derma-555-malam.html
│   ├── vitamin-c-face-serum.html
│   ├── turmeric-herbal-soap.html
│   ├── neem-aloe-face-wash.html
│   ├── rose-quartz-gua-sha.html
│   └── herbal-bath-soak.html
└── assets/
    ├── css/
    │   ├── global.css          Tokens, reset, base typography, header/footer, buttons — shared by every page
    │   └── <page>.css          One stylesheet per page, page-specific only
    ├── js/
    │   ├── config.js           Brand details (WhatsApp number, address, tagline)
    │   ├── data.js              Product catalog (PRODUCTS array, getProduct, discountPercent) —
    │   │                        isomorphic: also require()'d by /api/razorpay/create-order.js
    │   ├── promo.js             Promo codes (getPromo, applyPromo) — same isomorphic setup
    │   ├── cart.js              Cart engine — localStorage-backed, shared by every page
    │   ├── whatsapp.js          Builds the WhatsApp checkout URL + order message
    │   ├── header-footer.js     Cart badge + footer year, shared by every page
    │   └── <page>.js            Per-page interactivity
    └── images/                 Logo + product photos
```

Every page loads `global.css` + its own `<page>.css`, then
`config.js`, `data.js`, `cart.js`, `promo.js`, `whatsapp.js`,
`header-footer.js`, then its own `<page>.js` — in that order, since later
scripts depend on the earlier ones (`window.IrisPharma` namespace).

All internal links and asset paths are root-relative (`/shop.html`,
`/assets/css/global.css`) so nesting (e.g. `products/*.html`) doesn't
break them. This means pages must be served over HTTP, not opened directly
as `file://` — run a local server to preview, e.g.:

```bash
npx serve site
# or
python3 -m http.server --directory site 8000
```

Either works for browsing pages, but neither serves `/api/*` — the
Razorpay "Pay online" button needs `vercel dev` (run from the project
root, not from `site/`) to also serve the serverless functions. See
`../README.md`.

## Editing content

- **Business details** (WhatsApp number, address, tagline): `assets/js/config.js`
- **Products** (name, price, images, description): `assets/js/data.js`
- **Brand colors**: `assets/css/global.css` (see `docs/DESIGN_SYSTEM.md` in the project root)

## Checkout flow

`order.html` collects name/phone/address, then offers two ways to complete
the order:

- **Pay online** — `assets/js/order.js` calls `/api/razorpay/create-order`,
  opens Razorpay Checkout, then calls `/api/razorpay/verify-payment` to
  confirm the signature before treating the order as paid.
- **WhatsApp** — opens WhatsApp (`assets/js/whatsapp.js`) with the cart,
  total, and delivery details pre-filled so the order is confirmed by chat
  (payment by UPI/cash, as before).

Either way, a WhatsApp message is sent as the order receipt/notification —
for paid orders it's marked "Paid online via Razorpay" instead of asking
for payment.
