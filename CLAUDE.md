@docs/DESIGN_SYSTEM.md

The frontend is a **static HTML/CSS/vanilla-JS site** (no framework, no
build step) — see `site/README.md` for the folder structure and
conventions. Checkout offers two paths: pay online via **Razorpay**, or the
original WhatsApp-only flow (cash/UPI confirmed by chat). Razorpay orders
are created/verified by two small **Vercel serverless functions** under
`/api/razorpay/` (plain Node.js, no framework, no SDK — see `README.md` at
the project root). A dummy promo code (`SAVE10`, ₹10 off) is available for
testing the discount flow; see `site/assets/js/promo.js`.
