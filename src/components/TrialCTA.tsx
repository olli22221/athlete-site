import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { trialOffer } from "@/lib/memberships";
import Reveal from "@/components/Reveal";
import Kicker from "@/components/Kicker";
import CinematicBackdrop from "@/components/CinematicBackdrop";

export default function TrialCTA() {
  return (
    <section className="relative overflow-hidden bg-surface py-24">
      <CinematicBackdrop variant="section" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:px-10">
        <div>
          <Reveal>
            <Kicker>New here?</Kicker>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-5 text-balance text-4xl leading-tight sm:text-6xl">
              {trialOffer.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg leading-relaxed text-muted">
              {trialOffer.body}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="rounded-2xl border border-line bg-background p-8">
            <ul className="space-y-4">
              {trialOffer.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check size={17} className="mt-0.5 shrink-0 text-accent" />
                  <span className="text-sm text-foreground/85">{b}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-medium uppercase tracking-[0.15em] text-black transition-transform hover:-translate-y-0.5"
            >
              {trialOffer.cta}
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
