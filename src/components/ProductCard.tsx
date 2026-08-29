import Link from "next/link";
import { ArrowUpRight, Dumbbell, Shirt, Tag } from "lucide-react";
import type { Product, ProductCategory } from "@/lib/products";
import { categoryLabels } from "@/lib/products";

const categoryIcon: Record<ProductCategory, typeof Shirt> = {
  apparel: Shirt,
  competition: Dumbbell,
  accessories: Tag,
};

export default function ProductCard({ product }: { product: Product }) {
  const Icon = categoryIcon[product.category];

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-accent/50"
    >
      <div
        className="relative flex h-64 items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]})`,
        }}
      >
        <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_30%_20%,#fff,transparent_45%)]" />
        <Icon
          size={72}
          strokeWidth={1}
          className="text-white/25 transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
          {categoryLabels[product.category]}
        </span>
      </div>

      <div className="flex items-start justify-between gap-3 p-5">
        <div>
          <h3 className="font-display text-xl tracking-wide text-foreground">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted">{product.tagline}</p>
        </div>
        <ArrowUpRight
          size={20}
          className="mt-1 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>

      <div className="flex items-center justify-between border-t border-line px-5 py-4">
        <span className="font-display text-lg text-accent">
          ${product.price}
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-muted">
          View details
        </span>
      </div>
    </Link>
  );
}
