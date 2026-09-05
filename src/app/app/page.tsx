import type { Metadata } from "next";
import Link from "next/link";
import AppHero3D from "@/components/AppHero3D";
import WaitlistForm from "@/components/WaitlistForm";
import { SEGMENTS } from "@/lib/races";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "The app",
  description:
    "An AI training-plan app for hybrid racing, built on my own race data. iOS and Android — in development, not released yet.",
};

// The app's landing page. The opener is a phone you can turn, standing in a
// desert whose hills never stop coming — which is what a race feels like.
// The screen on it is a concept, and the page says so: there is nothing to
// screenshot yet.
export default function AppPage() {
  const stations = SEGMENTS.filter((segment) => segment.kind === "station");

  return (
    <>
      {/* This section is its own world: warm desert, dark ink, in both themes. */}
      <section className="relative h-[88svh] min-h-[560px] overflow-hidden text-[#1d150f]">
        <AppHero3D />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3a2818]/70 via-[#3a2818]/25 to-transparent pb-8 pt-20 sm:pb-14 sm:pt-32">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl text-[#fff4e6]">
              <p className="label !text-[#ffd9b3]">In development · iOS &amp; Android</p>
              <h1 className="board mt-3 text-[clamp(2.25rem,5.5vw,4.5rem)]">
                Training plans that know what a race costs
              </h1>
              {/* Hidden on phones: the 3D phone needs the height there. */}
              <p className="mt-4 hidden max-w-lg text-lg text-[#ffe8d0] sm:block">
                Built around your target time, your training days and the
                stations you actually lose time on — on my methodology and my
                race data, not whatever a chatbot happens to say.
              </p>
            </div>
            <p className="text-xs text-[#ffd9b3] sm:max-w-[16rem] sm:text-right sm:text-sm">
              <span className="hidden sm:inline">The hills do not stop. That is the sport.</span>
              <span className="block opacity-80 sm:mt-2 sm:text-xs">Drag the phone to turn it · concept screen, not the final UI</span>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-14">
        <p className="mb-10 max-w-lg text-lg text-ink-soft sm:hidden">
          Built around your target time, your training days and the stations
          you actually lose time on — on my methodology and my race data, not
          whatever a chatbot happens to say.
        </p>
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
            Not in the stores yet. This list is the decision: if it fills, the
            app gets built; if it does not, it does not — and you will have
            lost nothing. One email when there is something to install.
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
