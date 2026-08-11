// Product catalog. Add new products to this array as they become
// available — every page that lists products (home, /shop, cart, checkout)
// reads from here, so a new entry shows up everywhere automatically.
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
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function discountPercent(product: Product): number {
  return Math.round(((product.mrp - product.price) / product.mrp) * 100);
}
