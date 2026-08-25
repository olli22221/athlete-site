import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Dumbbell, Shirt, Tag } from "lucide-react";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import ProductPurchasePanel from "@/components/ProductPurchasePanel";
import {
  categoryLabels,
  getProductBySlug,
  products,
} from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

const categoryIcon = { apparel: Shirt, equipment: Dumbbell, accessories: Tag };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${siteConfig.name}`,
    description: product.tagline,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const Icon = categoryIcon[product.category];
  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="bg-background pb-28 pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-muted hover:text-accent"
        >
          <ArrowLeft size={16} />
          Back to Shop
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div
              className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-line"
              style={{
                background: `linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]})`,
              }}
            >
              <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_30%_20%,#fff,transparent_45%)]" />
              <Icon size={140} strokeWidth={1} className="text-white/20" />
              <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
                {categoryLabels[product.category]}
              </span>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h1 className="font-display text-balance text-4xl leading-tight sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-3 text-lg text-muted">{product.tagline}</p>
              <p className="font-display mt-6 text-4xl text-accent">
                ${product.price}
              </p>
              <p className="mt-6 leading-relaxed text-muted">
                {product.description}
              </p>

              <ul className="mt-6 space-y-3">
                {product.details.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-accent"
                    />
                    <span className="text-foreground/90">{d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <ProductPurchasePanel product={product} />
            </Reveal>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-28">
            <h2 className="font-display text-3xl">You might also like</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
