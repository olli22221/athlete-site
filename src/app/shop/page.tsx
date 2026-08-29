import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Kicker from "@/components/Kicker";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import ProductGrid from "@/components/ProductGrid";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Shop — ${siteConfig.fullName}`,
  description: "Gym apparel, Hyrox competition gear, and training accessories.",
};

export default function ShopPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-background pb-16 pt-40">
        <CinematicBackdrop variant="section" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <Kicker>The Shop</Kicker>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-5 max-w-2xl text-balance text-5xl leading-tight sm:text-6xl">
              Kit that survives the session.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-muted">
              Gym apparel, Hyrox competition gear, and the accessories we
              actually hand people on the floor. Members get 10% off with an
              Unlimited plan. Checkout is launching soon — register interest on
              any item and we&apos;ll hold one back.
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
