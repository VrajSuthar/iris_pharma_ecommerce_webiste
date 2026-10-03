import type { JournalArticle } from "../types";

/* TODO: replace with a fetch to the real journal/CMS API when available. */
export const journalArticles: JournalArticle[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=85",
    meta: "Skincare / Journal",
    title: "Building a better skincare ritual",
    excerpt:
      "Simple habits that make your everyday routine more intentional.",
    body: [
      "A good skincare ritual isn't about doing more — it's about doing the right things, consistently. Start with fewer products, used well, rather than a crowded shelf used carelessly.",
      "Cleanse morning and night, apply treatments on clean, slightly damp skin, and always finish with moisture to lock everything in. Consistency matters more than complexity.",
      "Give any new routine at least two to three weeks before judging results — skin needs time to adjust and show visible change.",
    ],
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=85",
    meta: "Ingredients / Journal",
    title: "Understanding active ingredients",
    excerpt: "A closer look at modern skincare formulations.",
    body: [
      "'Active' ingredients are the components in a formula clinically shown to change the skin — think retinoids, vitamin C, niacinamide or exfoliating acids.",
      "More active isn't always better. High concentrations introduced too quickly can irritate skin, especially if layered with other actives. Introduce one new active at a time.",
      "Always check how an ingredient pairs with the rest of your routine, and don't be afraid to alternate days rather than using every active, every day.",
    ],
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
    meta: "Wellness / Journal",
    title: "The art of slowing down",
    excerpt: "Creating a more thoughtful beauty ritual.",
    body: [
      "In a world of ten-step routines and constant new launches, there's quiet value in slowing down — using fewer products, with more attention.",
      "Treat your routine as a few minutes of stillness rather than a chore. The ritual itself, not just the result, is worth protecting.",
    ],
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?auto=format&fit=crop&w=900&q=85",
    meta: "Usage Guide / Journal",
    title: "How to use our soap safely",
    excerpt:
      "A quick guide to patch testing, everyday use and caring for sensitive skin.",
    body: [
      "Our soap bars are made with concentrated, naturally active ingredients. As with any new skincare product, we recommend a simple patch test before first use — especially if you have sensitive or reactive skin.",
      "Patch test: Lather a small amount of soap and apply it to the inside of your wrist or elbow. Wait 24 hours. If you notice redness, itching, swelling or irritation, discontinue use and rinse the area thoroughly with water.",
      "How to use: Wet the bar and your skin with lukewarm water. Lather gently between your hands or with a soft washcloth, apply to the body or face, and rinse thoroughly. Avoid direct contact with eyes.",
      "If irritation occurs: Stop use immediately, rinse the area with cool water, and consult a dermatologist if symptoms persist. Some individuals may be sensitive to essential oils, botanical extracts or fragrance components used in our formulas.",
      "Storage: Keep the bar in a dry, well-ventilated soap dish between uses — this extends its life and keeps it from softening too quickly.",
      "This guide is provided for general reference only and does not replace advice from a qualified dermatologist or physician.",
    ],
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=900&q=85",
    meta: "Process / Journal",
    title: "Why we cold-process our soap",
    excerpt: "The slower method behind every Iris Pharma bar.",
    body: [
      "Cold-process soap making retains more of the natural glycerin produced during saponification, instead of stripping it out industrially — which is part of why our bars feel gentler on skin.",
      "Each batch cures for several weeks before it's ready, allowing excess moisture to evaporate and the bar to harden into a longer-lasting form.",
      "It's a slower, more deliberate process than mass-produced detergent bars, but we think the result — a milder, better-moisturizing bar — is worth the wait.",
    ],
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1612800083273-24ea5c80313d?auto=format&fit=crop&w=900&q=85",
    meta: "Education / Journal",
    title: "Soap vs. body wash: which is right for you?",
    excerpt: "Breaking down the differences so you can choose confidently.",
    body: [
      "Bar soap tends to use simpler, more concentrated formulas with less packaging waste, while body washes often include added humectants and thickeners suited to very dry skin.",
      "If your skin is generally balanced, a well-formulated soap bar can cleanse effectively without over-stripping. If you have very dry or eczema-prone skin, look for a fragrance-free, superfatted bar — or ask us about our gentler formulations.",
      "Whichever you choose, the same rule applies: patch test new products, and introduce them one at a time.",
    ],
  },
];
