// ---------------------------------------------------------------------------
// Product catalog — showcase-only for now (no checkout wired up yet).
// Add/edit products here; every field flows through to the /products pages.
// Swap `image` for a real photo path (e.g. "/images/products/vest.jpg") once
// you have product photography — until then a styled gradient tile is shown.
// ---------------------------------------------------------------------------

export type ProductCategory = "apparel" | "equipment" | "accessories";

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
  apparel: "Apparel",
  equipment: "Equipment",
  accessories: "Accessories",
};

export const products: Product[] = [
  {
    slug: "forge-weight-vest",
    name: "Forge Weighted Vest",
    category: "equipment",
    price: 189,
    tagline: "Adjustable resistance, zero bounce.",
    description:
      "The vest I train in every day. Adjustable from 10–60lbs with steel shot packs, a compression fit that stays locked through sprints, and reinforced stitching built for years of abuse.",
    details: [
      "Adjustable 10–60 lbs in 5 lb increments",
      "Compression fit — no bounce, no chafing",
      "Reinforced double-stitched seams",
      "Moisture-wicking inner lining",
    ],
    sizes: ["S/M", "L/XL"],
    colors: ["Black", "Graphite"],
    gradient: ["#1a1a1a", "#3a3a2e"],
    featured: true,
  },
  {
    slug: "relentless-training-tee",
    name: "Relentless Training Tee",
    category: "apparel",
    price: 42,
    tagline: "The shirt I wear on the hardest sessions.",
    description:
      "Lightweight, four-way stretch performance fabric that keeps up when the session gets ugly. Minimal branding, maximum durability.",
    details: [
      "4-way stretch performance fabric",
      "Sweat-wicking + odor resistant",
      "Flatlock seams to prevent chafing",
      "Pre-shrunk, true to size",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Volt", "Ash"],
    gradient: ["#161616", "#2a2f1e"],
    featured: true,
  },
  {
    slug: "competitor-joggers",
    name: "Competitor Joggers",
    category: "apparel",
    price: 68,
    tagline: "Warm up, cool down, walk out.",
    description:
      "Tapered fit joggers built for the walk from the car to the platform and everything after. Zippered pockets, articulated knees, no-ride waistband.",
    details: [
      "Tapered athletic fit",
      "Zippered side + back pockets",
      "Articulated knee construction",
      "Wide, no-ride waistband",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Charcoal"],
    gradient: ["#141414", "#26262c"],
  },
  {
    slug: "iron-grip-lifting-straps",
    name: "Iron Grip Lifting Straps",
    category: "accessories",
    price: 24,
    tagline: "Stop losing the pull to grip.",
    description:
      "Heavy-duty cotton lifting straps with neoprene padding. Built to handle max-effort pulls without slipping.",
    details: [
      "Heavy-duty cotton weave",
      "Neoprene wrist padding",
      "Reinforced stitch loop",
      "One size, fully adjustable",
    ],
    gradient: ["#1c1c1c", "#2e2620"],
  },
  {
    slug: "endure-resistance-bands",
    name: "Endure Resistance Band Set",
    category: "equipment",
    price: 39,
    tagline: "Warm-up to max-effort, five bands deep.",
    description:
      "A five-band resistance set covering activation warm-ups through banded max-effort work. Includes a carry bag and anchor strap.",
    details: [
      "5 resistance levels (10–150 lbs)",
      "Natural latex, snap-resistant",
      "Door anchor + carry bag included",
      "Ideal for warm-ups & accessory work",
    ],
    gradient: ["#171717", "#202b24"],
  },
  {
    slug: "shadow-performance-hoodie",
    name: "Shadow Performance Hoodie",
    category: "apparel",
    price: 74,
    tagline: "Pre-session armor.",
    description:
      "A heavyweight training hoodie for cold warm-ups and colder mornings. Thumbholes, a kangaroo pocket built for a phone and keys, and a hood that stays put mid-run.",
    details: [
      "Heavyweight brushed fleece",
      "Thumbhole cuffs",
      "Secure-fit hood",
      "Kangaroo pocket",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
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
