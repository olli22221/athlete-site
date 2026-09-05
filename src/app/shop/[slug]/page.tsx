import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categoryLabels,
  formatPrice,
  getProductBySlug,
  products,
} from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return { title: product.name, description: product.tagline };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    offers: {
      "@type": "Offer",
      price: (product.priceCents / 100).toFixed(2),
      priceCurrency: "EUR",
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mx-auto max-w-[1400px] px-4 py-10">
        <Link href="/shop" className="label hover:!text-signal">
          ← Shop
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="label">{categoryLabels[product.category]}</p>
            <h1 className="board mt-3 text-[clamp(2.25rem,5vw,3.75rem)]">
              {product.name}
            </h1>
            <p className="mt-4 text-lg text-signal">{product.tagline}</p>
            <p className="mt-6 max-w-xl leading-relaxed text-ink-soft">
              {product.description}
            </p>

            <ul className="mt-8 flex flex-col gap-px bg-line">
              {product.details.map((detail) => (
                <li key={detail} className="bg-panel px-4 py-3 text-sm text-ink-soft">
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <aside className="self-start border border-line bg-panel p-6">
            <p className="tnum text-3xl">{formatPrice(product.priceCents)}</p>

            {product.sizes && (
              <>
                <p className="label mt-6">Sizes</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <li
                      key={size}
                      className="tnum border border-line px-3 py-1.5 text-sm text-muted"
                    >
                      {size}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-6 border-l-2 border-signal bg-ground px-4 py-3">
              <p className="board-sm text-sm">Not orderable yet</p>
              <p className="mt-1 text-sm text-ink-soft">
                The shop opens with the first qualification attempt. Ask to be
                told when it does:
              </p>
              <a
                href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
                  `Tell me when ${product.name} is available`
                )}`}
                className="board-sm mt-4 block bg-signal px-4 py-3 text-center text-sm text-signal-ink"
              >
                Email me about it
              </a>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
