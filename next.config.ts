import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site was originally a personal athlete brand before becoming a gym.
  // These preserve any links that were already pointing at the old routes.
  // 308 (permanent) so search engines transfer ranking to the new URLs.
  async redirects() {
    return [
      { source: "/products", destination: "/shop", permanent: true },
      { source: "/products/:slug", destination: "/shop/:slug", permanent: true },
      { source: "/clone", destination: "/coach-ai", permanent: true },
    ];
  },
};

export default nextConfig;
