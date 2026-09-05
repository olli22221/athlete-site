import type { Metadata } from "next";
import Link from "next/link";
import AppBadges from "@/components/AppBadges";
import PhoneMockup from "@/components/PhoneMockup";
import WaitlistForm from "@/components/WaitlistForm";
import { SEGMENTS } from "@/lib/races";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "The app",
  description:
    "An AI training-plan app for hybrid racing, built on my own race data. iOS and Android — in development, not released yet.",
};

// The app's landing page: what it is, what it will do, where it will land,
// and the waitlist that decides whether it gets built at all. The phone is a
// drawn concept screen, labelled as such — there is nothing to screenshot yet.
export default function AppPage() {
  const stations = SEGMENTS.filter((segment) => segment.kind === "station");

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 py-14 lg:grid-cols-[1.2fr_1fr] lg:py-20">
          <div>
            <p className="label">In development · iOS &amp; Android</p>
            <h1 className="board mt-3 text-[clamp(2.5rem,6vw,5rem)]">
              Training plans that know what a race costs
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-soft">
              Plans built around your target time, your training days and the
              stations you actually lose time on — generated with AI, on my
              methodology and my race data rather than whatever a chatbot
              happens to say.
            </p>

            <div className="mt-8">
              <AppBadges />
              <p className="mt-3 text-xs text-muted">
                Not in the stores yet. Both badges bring you back here until it
                is — the waitlist below is where you find out first.
              </p>
            </div>
          </div>

          <PhoneMockup />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-14">
        <h2 className="board text-2xl">What it will do</h2>
        <ol className="mt-6 grid gap-px bg-line md:grid-cols-2">
          <Feature n="01" title="Ask what you are actually chasing">
            Target time, days per week, access to a sled and a rower, and the
            two stations that keep costing you. Four answers, not a
            questionnaire.
          </Feature>
          <Feature n="02" title="Build an eight-week block">
            Compromised running paired with the station that precedes it,
            progressed week by week, with the volume jumps and rest days checked
            against rules rather than left to the model.
          </Feature>
          <Feature n="03" title="Adjust on what you enter">
            Log a session or a race and the following weeks move. A plan that
            never changes after week two is a PDF, not an app.
          </Feature>
          <Feature n="04" title="Compare against real races">
            The same splits published on this site, as the benchmark your
            numbers sit next to.
          </Feature>
        </ol>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-[1400px] px-4 py-14">
          <h2 className="board text-2xl">Built around the eight stations</h2>
          <ul className="mt-6 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {stations.map((station, index) => (
              <li key={station.id} className="bg-panel p-4">
                <span className="tnum text-xs text-signal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="board-sm mt-2 text-sm">{station.label}</p>
                <p className="tnum mt-1 text-xs text-muted">{station.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-12 px-4 py-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="label">Waitlist</p>
          <h2 className="board mt-3 text-3xl">Tell me when it ships</h2>
          <p className="mt-4 max-w-md text-ink-soft">
            This list is the decision. If it fills, the app gets built; if it
            does not, it does not — and you will have lost nothing. One email
            when there is something to install.
          </p>
          <p className="mt-6 text-sm text-muted">
            Until then, the{" "}
            <Link href="/avatar" className="text-signal">
              video avatar
            </Link>{" "}
            answers training questions by the session, and every split from
            every race is free on the{" "}
            <Link href="/races" className="text-signal">
              races page
            </Link>
            .
          </p>
        </div>
        <div className="self-start">
          <WaitlistForm />
          <p className="mt-4 text-xs text-muted">
            The app will not be medical advice or personal coaching. Anything it
            generates is general training information — check with a
            professional before acting on it. Questions: {siteConfig.contactEmail}.
          </p>
        </div>
      </section>
    </>
  );
}

function Feature({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="bg-panel px-5 py-5">
      <span className="tnum text-xs text-signal">{n}</span>
      <p className="board-sm mt-1 text-base">{title}</p>
      <p className="mt-1 max-w-xl text-sm text-ink-soft">{children}</p>
    </li>
  );
}
