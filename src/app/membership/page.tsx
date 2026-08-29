import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Kicker from "@/components/Kicker";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import MembershipCards from "@/components/MembershipCards";
import TrialCTA from "@/components/TrialCTA";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Membership — ${siteConfig.fullName}`,
  description:
    "Rolling monthly membership plans for CrossFit, Hyrox and strength training. No lock-in contracts.",
};

const faqs = [
  {
    q: "Do I need to be fit before I join?",
    a: "No. Every class is scaled to the person doing it — that's the whole point of coached training. Our On-Ramp course exists specifically for people who have never done this before.",
  },
  {
    q: "Is there a joining fee or a contract?",
    a: "No joining fee, and every plan is rolling monthly. Cancel or switch tiers with a month's notice; there's nothing to lock you in.",
  },
  {
    q: "Can I freeze my membership?",
    a: "Yes — up to two months a year for holidays, injury or work. Just let us know before your billing date.",
  },
  {
    q: "What's the difference between CrossFit and Hyrox classes?",
    a: "CrossFit classes are constantly varied: strength, gymnastics and conditioning. Hyrox classes are race-specific — sleds, wall balls, burpee broad jumps and running, in the format you'll meet on race day.",
  },
];

export default function MembershipPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-background pb-12 pt-40">
        <CinematicBackdrop variant="section" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <Kicker>Membership</Kicker>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-5 max-w-2xl text-balance text-5xl leading-tight sm:text-6xl">
              Rolling monthly. No lock-in.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-muted">
              Every plan includes full coaching on every session, free Open Gym
              access, and the same standard of programming. Pick the frequency
              that fits your week.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-background pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <MembershipCards />
        </div>
      </section>

      <TrialCTA />

      <section className="bg-background py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl">
              Common questions
            </h2>
          </Reveal>
          <dl className="mt-10 space-y-8">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.06}>
                <div className="border-t border-line pt-6">
                  <dt className="font-medium text-foreground">{faq.q}</dt>
                  <dd className="mt-2 leading-relaxed text-muted">{faq.a}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
