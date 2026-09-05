import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";



// AI crawlers are allowed on purpose. Being quoted in an answer is the point
// of the FAQ and the published splits — blocking the crawlers that read them
// would defeat the whole reason those pages exist.
export default function robots(): MetadataRoute.Robots {
  const origin = siteUrl();

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${origin}/sitemap.xml`,
  };
}
