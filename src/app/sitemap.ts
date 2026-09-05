import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";
import { products } from "@/lib/products";



export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteUrl();
  const now = new Date();

  const pages = ["", "/races", "/about", "/avatar", "/app", "/shop", "/faq", "/contact"].map(
    (path) => ({
      url: `${origin}${path}`,
      lastModified: now,
      changeFrequency: path === "/races" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.8,
    })
  );

  const productPages = products.map((product) => ({
    url: `${origin}/shop/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...pages, ...productPages];
}
