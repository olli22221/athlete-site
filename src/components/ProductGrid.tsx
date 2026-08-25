"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { categoryLabels, products, type ProductCategory } from "@/lib/products";

const filters: Array<{ label: string; value: ProductCategory | "all" }> = [
  { label: "All", value: "all" },
  { label: categoryLabels.apparel, value: "apparel" },
  { label: categoryLabels.equipment, value: "equipment" },
  { label: categoryLabels.accessories, value: "accessories" },
];

export default function ProductGrid() {
  const [active, setActive] = useState<ProductCategory | "all">("all");

  const visible =
    active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
              active === f.value
                ? "border-accent bg-accent text-black"
                : "border-line text-muted hover:border-accent/50 hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product, i) => (
          <Reveal key={product.slug} delay={(i % 3) * 0.06}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
