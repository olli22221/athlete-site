import type { Metadata } from "next";
import { MessageCircle, ShieldCheck, Zap } from "lucide-react";
import Reveal from "@/components/Reveal";
import Kicker from "@/components/Kicker";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import TavusClone from "@/components/TavusClone";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Talk to My AI Clone — ${siteConfig.name}`,
  description:
    "Have a live, face-to-face conversation with an AI-powered clone, trained on my coaching philosophy.",
};

const points = [
  {
    icon: Zap,
    title: "Available 24/7",
    description: "No booking, no time zones — ask a training question any time.",
  },
  {
    icon: MessageCircle,
    title: "Trained on my knowledge",
    description:
      "Answers reflect my actual coaching philosophy, programming style, and voice.",
  },
  {
    icon: ShieldCheck,
    title: "Real, face-to-face video",
    description:
      "Powered by Tavus — a live video conversation, not a text chatbot.",
  },
];

export default function ClonePage() {
  return (
    <section className="grain relative overflow-hidden bg-background pb-28 pt-40">
      <CinematicBackdrop variant="hero" />
      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal>
          <Kicker>AI Clone</Kicker>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display mt-5 max-w-2xl text-balance text-5xl leading-tight sm:text-6xl">
            Talk to me — even when I&apos;m not around.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-muted">
            This is a real-time video conversation with an AI clone of me,
            built on{" "}
            <a
              href="https://www.tavus.io"
              target="_blank"
              rel="noreferrer"
              className="text-accent underline underline-offset-4"
            >
              Tavus
            </a>
            . Ask about programming, recovery, nutrition, or anything
            you&apos;d normally ask me in a session.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal delay={0.25} className="space-y-6">
            {points.map((point) => (
              <div key={point.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-accent">
                  <point.icon size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.3}>
            <TavusClone />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
