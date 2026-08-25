"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import type { Product } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export default function ProductPurchasePanel({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes?.[0]);
  const [color, setColor] = useState(product.colors?.[0]);

  const mailBody = encodeURIComponent(
    `Hi! I'd like to be notified when the "${product.name}" is available to purchase.${
      size ? `\nSize: ${size}` : ""
    }${color ? `\nColor: ${color}` : ""}`
  );

  return (
    <div className="rounded-2xl border border-line bg-surface p-7">
      {product.sizes && (
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Size
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  size === s
                    ? "border-accent bg-accent text-black"
                    : "border-line text-muted hover:border-accent/50 hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.colors && (
        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Color
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  color === c
                    ? "border-accent bg-accent text-black"
                    : "border-line text-muted hover:border-accent/50 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <a
        href={`mailto:${siteConfig.social.email}?subject=${encodeURIComponent(
          `Notify me — ${product.name}`
        )}&body=${mailBody}`}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-medium uppercase tracking-[0.15em] text-black transition-transform hover:-translate-y-0.5"
      >
        <Mail size={16} />
        Notify Me When Available
      </a>
      <p className="mt-4 text-center text-xs text-muted">
        Store checkout is launching soon. This sends a quick email instead.
      </p>
    </div>
  );
}
