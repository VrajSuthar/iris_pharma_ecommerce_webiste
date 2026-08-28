// Product catalog. Add new products to this array as they become
// available — every page that lists products (home, shop, product pages,
// cart, checkout) reads from here, so a new entry shows up everywhere
// automatically.
//
// Isomorphic on purpose: the browser gets `window.IrisPharma.PRODUCTS`, and
// the Razorpay serverless functions (`api/razorpay/*.js`) `require()` this
// same file for `module.exports`. That way order amounts are always priced
// from this one catalog server-side too — a tampered client request can
// never change what actually gets charged.
(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.IrisPharma = root.IrisPharma || {};
    Object.assign(root.IrisPharma, factory());
  }
})(typeof window !== "undefined" ? window : globalThis, function () {
  const PRODUCTS = [
  {
    slug: "derma-555-malam",
    name: "Derma 555 Malam",
    category: "Skin & Fungal Relief",
    tagline: "Ayurvedic relief from ringworm, itching & fungal infections",
    description:
      "An Ayurvedic ointment made with natural herbs for ringworm, scabies, itching, cracked skin and fungal infections.",
    price: 130,
    mrp: 140,
    image: "/assets/images/derma-555/poster.jpg",
    gallery: [
      "/assets/images/derma-555/poster.jpg",
      "/assets/images/derma-555/pack-and-jar.jpg",
      "/assets/images/derma-555/boxes-group.jpg",
    ],
    howToUse: [
      "Clean the affected area well and pat it dry.",
      "Gently apply a thin layer of Derma 555 Malam, three times a day.",
      "For dry or cracked heels, apply generously and wear socks overnight for best results.",
    ],
  },
  {
    slug: "vitamin-c-face-serum",
    name: "CutisGlow Vitamin C Face Serum",
    category: "Face Serum",
    tagline: "Age-defying, skin-whitening glow serum with Vitamin E",
    description:
      "A lightweight, fast-absorbing Vitamin C face serum enriched with Vitamin E and glycerin. Formulated to brighten skin tone, fade dark spots and support an even, age-defying glow. Silicone-free, paraben-free and sulphate-free — suitable for all skin types. Net contents: 30ML.",
    price: 265,
    mrp: 499,
    image: "/assets/images/vitamin-c-serum/poster.jpg",
    gallery: [
      "/assets/images/vitamin-c-serum/poster.jpg",
      "/assets/images/vitamin-c-serum/open-dropper.jpg",
      "/assets/images/vitamin-c-serum/lifestyle-oranges.jpg",
      "/assets/images/vitamin-c-serum/lifestyle-flowers.jpg",
      "/assets/images/vitamin-c-serum/how-to-use.jpg",
    ],
    howToUse: [
      "Take 2–3 drops of the Vitamin C Serum.",
      "Gently apply on clean, dry face & neck.",
      "Pat lightly for quick absorption.",
      "Follow with moisturizer & sunscreen. For best results, apply every morning and night.",
    ],
  },
  {
    slug: "turmeric-herbal-soap",
    name: "Haldi Herbal Soap",
    category: "Herbal Soap & Body Care",
    tagline: "Cold-pressed turmeric soap for clear, even-toned skin",
    description:
      "A cold-pressed handmade soap bar with turmeric, honey and natural oils. Gently cleanses without stripping moisture, helps fade tanning and leaves skin soft and even-toned. Free from sulphates and artificial colour.",
    price: 149,
    mrp: 199,
    image: "/assets/images/stock/turmeric-soap.jpg",
    gallery: [
      "/assets/images/stock/turmeric-soap.jpg",
      "/assets/images/stock/turmeric-honey-soap.jpg",
      "/assets/images/stock/turmeric-paste-hands.jpg",
    ],
    howToUse: [
      "Wet the soap bar and work into a lather between your palms.",
      "Massage gently onto damp face or body in circular motions.",
      "Rinse thoroughly with lukewarm water.",
      "Use daily for soft, glowing, even-toned skin.",
    ],
  },
  {
    slug: "neem-aloe-face-wash",
    name: "Neem & Aloe Vera Face Wash",
    category: "Face Cleanser",
    tagline: "Purifying daily face wash for acne-prone skin",
    description:
      "A soap-free gel face wash with neem and aloe vera extracts that clears excess oil, soothes breakouts and calms irritated skin — without over-drying. Dermatologically tested and suitable for daily use.",
    price: 199,
    mrp: 249,
    image: "/assets/images/stock/skincare-flatlay.jpg",
    gallery: [
      "/assets/images/stock/skincare-flatlay.jpg",
      "/assets/images/stock/bath-essentials-3.jpg",
      "/assets/images/stock/dropper-hand.jpg",
    ],
    howToUse: [
      "Splash your face with water.",
      "Take a small amount and massage gently for 30 seconds.",
      "Rinse off with water and pat dry.",
      "Use twice daily — morning and night — for best results.",
    ],
  },
  {
    slug: "rose-quartz-gua-sha",
    name: "Rose Quartz Gua Sha Facial Tool",
    category: "Facial Tools",
    tagline: "De-puff, sculpt and boost glow in 5 minutes a day",
    description:
      "A hand-polished rose quartz gua sha stone that helps de-puff, sculpt facial contours and improve circulation for a natural, lifted glow. Pair with your favourite Iris Pharma serum or facial oil for smooth glide.",
    price: 349,
    mrp: 499,
    image: "/assets/images/stock/gua-sha-roller.jpg",
    gallery: [
      "/assets/images/stock/gua-sha-roller.jpg",
      "/assets/images/stock/bath-essentials-2.jpg",
    ],
    howToUse: [
      "Apply a few drops of facial oil or serum before use.",
      "Glide the flat edge along your jawline, cheeks and forehead using light upward strokes.",
      "Spend 30–60 seconds per area, 5 minutes total.",
      "Clean with a damp cloth after each use.",
    ],
  },
  {
    slug: "herbal-bath-soak",
    name: "Herbal Detox Bath Soak",
    category: "Bath & Body",
    tagline: "Ayurvedic bath salts with rose, neem & Epsom minerals",
    description:
      "A relaxing bath soak blending Epsom salts with rose petals, neem and herbal extracts to soothe tired muscles, soften skin and calm the mind after a long day. Free from artificial dyes.",
    price: 299,
    mrp: 399,
    image: "/assets/images/stock/bath-essentials.jpg",
    gallery: [
      "/assets/images/stock/bath-essentials.jpg",
      "/assets/images/stock/bath-essentials-2.jpg",
      "/assets/images/stock/bath-essentials-3.jpg",
    ],
    howToUse: [
      "Fill your bathtub with warm water.",
      "Add 2–3 tablespoons of the soak and stir to dissolve.",
      "Soak for 15–20 minutes and rinse off.",
      "Use 2–3 times a week for best results.",
    ],
  },
  ];

  function getProduct(slug) {
    return PRODUCTS.find((p) => p.slug === slug);
  }

  function discountPercent(product) {
    return Math.round(((product.mrp - product.price) / product.mrp) * 100);
  }

  return { PRODUCTS, getProduct, discountPercent };
});
