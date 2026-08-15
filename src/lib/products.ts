// Product catalog. Add new products to this array as they become
// available — every page that lists products (home, /shop, /product/[slug],
// cart, checkout) reads from here, so a new entry shows up everywhere
// automatically.
export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price: number; // INR
  mrp: number; // INR — struck-through "MRP" shown next to the discounted price
  image: string;
  gallery: string[];
  howToUse: string[];
  // Optional limited-time promo label (e.g. a festival sale). Rendered as a
  // tricolor ribbon on the product card and product page — leave unset for
  // everyday pricing.
  promoTag?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "derma-555-malam",
    name: "Derma 555 Malam",
    category: "Skin & Fungal Relief",
    tagline: "Ayurvedic relief from ringworm, itching & fungal infections",
    description:
      "An Ayurvedic ointment made with natural herbs for ringworm, scabies, itching, cracked skin and fungal infections.",
    price: 130,
    mrp: 140,
    image: "/derma-555/poster.jpg",
    gallery: [
      "/derma-555/poster.jpg",
      "/derma-555/pack-and-jar.jpg",
      "/derma-555/boxes-group.jpg",
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
    image: "/vitamin-c-serum/poster.jpg",
    gallery: [
      "/vitamin-c-serum/poster.jpg",
      "/vitamin-c-serum/open-dropper.jpg",
      "/vitamin-c-serum/lifestyle-oranges.jpg",
      "/vitamin-c-serum/lifestyle-flowers.jpg",
      "/vitamin-c-serum/how-to-use.jpg",
    ],
    howToUse: [
      "Take 2–3 drops of the Vitamin C Serum.",
      "Gently apply on clean, dry face & neck.",
      "Pat lightly for quick absorption.",
      "Follow with moisturizer & sunscreen. For best results, apply every morning and night.",
    ],
    promoTag: "Independence Day Sale",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function discountPercent(product: Product): number {
  return Math.round(((product.mrp - product.price) / product.mrp) * 100);
}
