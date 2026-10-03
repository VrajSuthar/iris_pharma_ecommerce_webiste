import type { Product } from "../types";

/* TODO: replace with a fetch to the real products API when available. */
export const products: Product[] = [
  {
    id: 1,
    name: "Radiance Serum",
    category: "serum",
    categoryName: "Face / Serum",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=85",
    description:
      "A lightweight daily serum designed to become part of a simple, refined skincare ritual.",
  },
  {
    id: 2,
    name: "Velvet Moisture",
    category: "face",
    categoryName: "Face / Hydration",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=85",
    description:
      "A rich yet elegant moisturizer with a soft finish for everyday hydration.",
  },
  {
    id: 3,
    name: "Pure Balance",
    category: "cleanser",
    categoryName: "Face / Cleanser",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=900&q=85",
    description: "A gentle cleanser created for a clean, comfortable skin feel.",
  },
  {
    id: 4,
    name: "Renewal Cream",
    category: "face",
    categoryName: "Face / Treatment",
    price: 1699,
    image:
      "https://images.unsplash.com/photo-1631438420064-8f1b2b52b2e6?auto=format&fit=crop&w=900&q=85",
    description:
      "A luxurious cream designed for an elevated evening skincare ritual.",
  },
  {
    id: 5,
    name: "Botanical Body Oil",
    category: "body",
    categoryName: "Body Care",
    price: 1199,
    image:
      "https://images.unsplash.com/photo-1611930022148-5c4f3a8e4e1c?auto=format&fit=crop&w=900&q=85",
    description:
      "A nourishing body oil with a silky texture and botanical-inspired ritual.",
  },
  {
    id: 6,
    name: "Calm Recovery Serum",
    category: "serum",
    categoryName: "Serum / Recovery",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85",
    description:
      "A minimalist serum concept for a calming and restorative skincare routine.",
  },
  {
    id: 7,
    name: "Soft Cleanse",
    category: "cleanser",
    categoryName: "Cleanser",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85",
    description: "A soft cleansing formula for a fresh and comfortable daily ritual.",
  },
  {
    id: 8,
    name: "Iris Body Cream",
    category: "body",
    categoryName: "Body Care",
    price: 1399,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85",
    description:
      "A creamy body treatment designed to leave skin feeling smooth and nourished.",
  },
];
