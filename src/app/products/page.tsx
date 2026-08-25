import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Kicker from "@/components/Kicker";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import ProductGrid from "@/components/ProductGrid";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Shop — ${siteConfig.name}`,
  description: "Athlete apparel, weight vests, and training equipment.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-background pb-16 pt-40">
        <CinematicBackdrop variant="section" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <Kicker>The Collection</Kicker>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-5 max-w-2xl text-balance text-5xl leading-tight sm:text-6xl">
              Gear tested in real training.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-muted">
              Everything here is what I actually wear and use — apparel,
              weighted vests, and equipment built to hold up to daily
              training. Store checkout is launching soon; inquire on any
              product to be notified first.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-background pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ProductGrid />
        </div>
      </section>
    </>
  );
}
