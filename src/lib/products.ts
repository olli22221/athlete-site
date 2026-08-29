// ---------------------------------------------------------------------------
// Gym shop — merch and Hyrox competition gear. Showcase-only for now
// (no checkout wired up), so each product links to an enquiry flow.
//
// Swap `image` for a real photo path once you have product photography —
// until then a styled gradient tile is shown.
// ---------------------------------------------------------------------------

export type ProductCategory = "apparel" | "competition" | "accessories";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  tagline: string;
  description: string;
  details: string[];
  sizes?: string[];
  colors?: string[];
  image?: string;
  gradient: [string, string];
  featured?: boolean;
};

export const categoryLabels: Record<ProductCategory, string> = {
  apparel: "Gym Apparel",
  competition: "Hyrox Gear",
  accessories: "Accessories",
};

export const products: Product[] = [
  {
    slug: "forge-weight-vest",
    name: "FORGE Weighted Vest",
    category: "competition",
    price: 189,
    tagline: "Hyrox-legal, zero bounce.",
    description:
      "The vest we use for Hyrox prep. Meets competition weight requirements (10kg men / 5kg women), with a compression fit that stays locked through wall balls, burpees and running.",
    details: [
      "Hyrox competition weights: 10kg / 5kg",
      "Compression fit — no bounce over running legs",
      "Low profile so it clears the wall ball catch",
      "Reinforced double-stitched seams",
    ],
    sizes: ["S/M", "L/XL"],
    colors: ["Black", "Graphite"],
    gradient: ["#1a1a1a", "#3a3a2e"],
    featured: true,
  },
  {
    slug: "forge-training-tee",
    name: "FORGE Training Tee",
    category: "apparel",
    price: 32,
    tagline: "The gym shirt, done properly.",
    description:
      "Lightweight four-way stretch with a small chest mark. Survives rope climbs, bar work and the wash cycle after.",
    details: [
      "4-way stretch performance fabric",
      "Sweat-wicking and odour resistant",
      "Flatlock seams to prevent chafing",
      "Pre-shrunk, true to size",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Volt", "Ash"],
    gradient: ["#161616", "#2a2f1e"],
    featured: true,
  },
  {
    slug: "grip-shorts",
    name: "Competition Shorts",
    category: "apparel",
    price: 48,
    tagline: "Run, lunge, jump, repeat.",
    description:
      "Built for the eight-kilometre half of a Hyrox. Zero-chafe liner, secure zip pocket, and a hem that doesn't ride during burpee broad jumps.",
    details: [
      "Anti-chafe bonded liner",
      "Secure zip pocket for a key or gel",
      "Four-way stretch, quick drying",
      "Reflective detail for night running",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Charcoal"],
    gradient: ["#141414", "#26262c"],
  },
  {
    slug: "hand-grips",
    name: "No-Tear Hand Grips",
    category: "accessories",
    price: 29,
    tagline: "Keep your hands on the bar.",
    description:
      "Three-finger carbon grips for toes-to-bar, pull-ups and muscle-ups. Break in fast and hold chalk well.",
    details: [
      "Carbon composite, no break-in tearing",
      "Three-finger design",
      "Adjustable wrist strap",
      "Sold as a pair with a carry pouch",
    ],
    sizes: ["S", "M", "L"],
    gradient: ["#1c1c1c", "#2e2620"],
  },
  {
    slug: "skipping-rope",
    name: "Speed Rope",
    category: "accessories",
    price: 34,
    tagline: "Double-unders, finally.",
    description:
      "Adjustable steel cable rope with precision bearings. The rope we hand people when they're learning double-unders.",
    details: [
      "Ball-bearing swivel for a true spin",
      "Adjustable cable, cut to your height",
      "Knurled aluminium handles",
      "Spare cable included",
    ],
    gradient: ["#171717", "#202b24"],
  },
  {
    slug: "forge-hoodie",
    name: "FORGE Hoodie",
    category: "apparel",
    price: 68,
    tagline: "For the walk in at 5:50am.",
    description:
      "Heavyweight brushed fleece with an embroidered chest mark. Warm enough for a winter car park, relaxed enough to live in.",
    details: [
      "Heavyweight brushed fleece",
      "Embroidered chest mark",
      "Kangaroo pocket",
      "Unisex relaxed fit",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Volt Trim"],
    gradient: ["#151515", "#242424"],
    featured: true,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}
