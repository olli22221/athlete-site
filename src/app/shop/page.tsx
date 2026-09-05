import type { Metadata } from "next";
import Link from "next/link";
import { categoryLabels, formatPrice, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Season apparel, race-day kit and split prints. Opening with the first qualification attempt.",
};

export default function ShopPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-12">
          <p className="label">Not open yet</p>
          <h1 className="board mt-3 text-[clamp(2.5rem,7vw,5rem)]">Shop</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">
            No logo merch. Everything here carries a line from the season
            instead — which means none of it makes sense until the season does.
          </p>
          <p className="mt-4 max-w-2xl text-sm text-muted">
            The shop opens with the first qualification attempt. Until then this
            is a preview, and nothing is orderable.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 py-12">
        <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.slug} className="bg-panel">
              <Link href={`/shop/${product.slug}`} className="flex h-full flex-col p-5">
                <span className="label">{categoryLabels[product.category]}</span>
                <span className="board-sm mt-3 text-lg">{product.name}</span>
                <span className="mt-2 text-sm text-ink-soft">{product.tagline}</span>
                <span className="mt-auto flex items-baseline justify-between gap-3 pt-6">
                  <span className="tnum text-xl">{formatPrice(product.priceCents)}</span>
                  <span className="label !text-signal">
                    {product.available ? "In stock" : "Soon"}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
