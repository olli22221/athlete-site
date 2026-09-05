// ---------------------------------------------------------------------------
// Shop catalogue — showcase only, no checkout yet.
//
// Deliberately not logo merch: nobody buys a stranger's logo. Everything here
// carries a line from the season instead, so it sells belonging rather than
// fabric. Print-on-demand until a drop actually sells, then reconsider.
// ---------------------------------------------------------------------------

export type ProductCategory = "apparel" | "race" | "print";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  priceCents: number;
  tagline: string;
  description: string;
  details: string[];
  sizes?: string[];
  /** Not yet orderable — the shop opens with the first qualification attempt. */
  available: boolean;
};

export const categoryLabels: Record<ProductCategory, string> = {
  apparel: "Apparel",
  race: "Race day",
  print: "Print",
};

export const products: Product[] = [
  {
    slug: "roxzone-tee",
    name: "Roxzone Tee",
    category: "apparel",
    priceCents: 3400,
    tagline: "The split nobody trains.",
    description:
      "For everyone who has watched two minutes disappear between stations and decided to do something about it. Printed small on the chest, not across it.",
    details: ["Heavyweight cotton", "Unisex fit", "Printed in the EU"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    available: false,
  },
  {
    slug: "eight-and-eight-tee",
    name: "Eight & Eight",
    category: "apparel",
    priceCents: 3400,
    tagline: "Eight runs. Eight stations. One clock.",
    description:
      "The format on the back, in the order it is run. Reads as a list to anyone who has done it and as nothing at all to anyone who has not, which is the point.",
    details: ["Heavyweight cotton", "Unisex fit", "Back print"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    available: false,
  },
  {
    slug: "season-cap",
    name: "Season Cap",
    category: "race",
    priceCents: 2900,
    tagline: "Worn at every race this season.",
    description:
      "Five-panel, unstructured, small season mark on the side. The one I actually race in, which is the only endorsement worth anything.",
    details: ["Five-panel", "Adjustable", "Sweat-resistant band"],
    available: false,
  },
  {
    slug: "split-poster",
    name: "Split Poster",
    category: "print",
    priceCents: 2400,
    tagline: "One race, sixteen bars.",
    description:
      "A race printed as its splits — the same chart as on this site, at A2. Which race, and which set of numbers, is chosen at checkout once the shop opens.",
    details: ["A2, 420 × 594 mm", "Matte 200 gsm", "Shipped in a tube"],
    available: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}
