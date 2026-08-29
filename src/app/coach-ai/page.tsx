import type { Metadata } from "next";
import { MessageCircle, ShieldCheck, Zap } from "lucide-react";
import Reveal from "@/components/Reveal";
import Kicker from "@/components/Kicker";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import TavusCoach from "@/components/TavusCoach";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `AI Coach — ${siteConfig.fullName}`,
  description:
    "Ask our AI coach what a class involves, what Hyrox is, and whether you're ready to start.",
};

const points = [
  {
    icon: Zap,
    title: "Available 24/7",
    description:
      "No booking, no waiting for the gym to open. Ask at 11pm the night before your first class.",
  },
  {
    icon: MessageCircle,
    title: "Knows how we coach",
    description:
      "Answers reflect our actual programming, scaling approach and class structure — not generic fitness advice.",
  },
  {
    icon: ShieldCheck,
    title: "Real face-to-face video",
    description:
      "Powered by Tavus — a live video conversation, not a text chatbot buried in a widget.",
  },
];

const askAbout = [
  "What actually happens in a CrossFit class?",
  "What is Hyrox, and how is it different?",
  "I've never lifted before — where do I start?",
  "How do you scale a workout for a beginner?",
  "Which membership fits training 3x a week?",
];

export default function CoachAIPage() {
  return (
    <section className="grain relative overflow-hidden bg-background pb-28 pt-40">
      <CinematicBackdrop variant="hero" />
      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal>
          <Kicker>AI Coach</Kicker>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display mt-5 max-w-2xl text-balance text-5xl leading-tight sm:text-6xl">
            Ask anything before you walk in.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-muted">
            Walking into a CrossFit gym for the first time is the hardest part.
            This is a real-time video conversation with our AI coach, built on{" "}
            <a
              href="https://www.tavus.io"
              target="_blank"
              rel="noreferrer"
              className="text-accent underline underline-offset-4"
            >
              Tavus
            </a>{" "}
            — ask the questions you&apos;d feel awkward asking in person.
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
                  <h3 className="font-medium text-foreground">{point.title}</h3>
                  <p className="mt-1 text-sm text-muted">{point.description}</p>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                Try asking
              </p>
              <ul className="mt-4 space-y-2.5">
                {askAbout.map((q) => (
                  <li key={q} className="text-sm text-foreground/80">
                    &ldquo;{q}&rdquo;
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <TavusCoach />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
