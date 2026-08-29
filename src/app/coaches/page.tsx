import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Kicker from "@/components/Kicker";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import CoachGrid from "@/components/CoachGrid";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Coaches — ${siteConfig.fullName}`,
  description:
    "Meet the certified CrossFit and Hyrox coaches who run every class.",
};

export default function CoachesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-background pb-12 pt-40">
        <CinematicBackdrop variant="section" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <Kicker>The Coaches</Kicker>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-5 max-w-2xl text-balance text-5xl leading-tight sm:text-6xl">
              The coaching is the product.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-muted">
              Nine certified coaches, every class covered start to finish. They
              scale the workout to you, correct your movement, and know your
              name by the second session.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-background pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <CoachGrid />
        </div>
      </section>
    </>
  );
}
