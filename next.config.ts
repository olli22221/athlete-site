import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site has been a personal brand and a gym before becoming the athlete
  // project it is now. These keep every URL that was ever published working.
  // 308 (permanent) so search engines move the ranking across rather than
  // splitting it between old and new.
  async redirects() {
    return [
      { source: "/products", destination: "/shop", permanent: true },
      { source: "/products/:slug", destination: "/shop/:slug", permanent: true },
      { source: "/clone", destination: "/avatar", permanent: true },
      { source: "/coach-ai", destination: "/avatar", permanent: true },
      { source: "/schedule", destination: "/races", permanent: true },
      { source: "/coaches", destination: "/about", permanent: true },
      { source: "/membership", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
