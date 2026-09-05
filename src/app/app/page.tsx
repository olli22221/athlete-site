import type { Metadata } from "next";
import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";
import { SEGMENTS } from "@/lib/races";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "The app",
  description:
    "An AI training-plan app for hybrid racing, built on my own race data. iOS and Android — in development, not released yet.",
};

// Placeholder page for the mobile app. Deliberately not pretending to be a
// launch: no fake store badges, no screenshots of something that does not
// exist. What it does carry is the waitlist, which is the signal that decides
// whether the app gets built at all.
export default function AppPage() {
  const stations = SEGMENTS.filter((segment) => segment.kind === "station");

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-12">
          <p className="label">In development · iOS &amp; Android</p>
          <h1 className="board mt-3 text-[clamp(2.25rem,5vw,4.25rem)]">
            Training plans that know what a race costs
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">
            An app that builds hybrid-racing plans around your target time, your
            training days and the stations you actually lose time on — generated
            with AI, but on my methodology and my race data rather than
            whatever a chatbot happens to say.
          </p>
          <p className="mt-4 max-w-2xl text-sm text-muted">
            It is not released. There is no download yet, and nothing on this
            page is orderable. When it ships, it ships on both platforms.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          {/* Store slots, shown as what they are: empty until they are not. */}
          <p className="label">Where it will land</p>
          <ul className="mt-4 grid gap-px bg-line sm:grid-cols-2">
            <StoreSlot platform="iOS" store="App Store" />
            <StoreSlot platform="Android" store="Google Play" />
          </ul>

          <h2 className="board mt-14 text-2xl">What it will do</h2>
          <ol className="mt-5 flex flex-col gap-px bg-line">
            <Feature n="01" title="Ask what you are actually chasing">
              Target time, days per week, access to a sled and a rower, and the
              two stations that keep costing you. Four answers, not a
              questionnaire.
            </Feature>
            <Feature n="02" title="Build an eight-week block">
              Compromised running paired with the station that precedes it,
              progressed week by week, with the volume jumps and rest days
              checked against rules rather than left to the model.
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

          <h2 className="board mt-14 text-2xl">Built around the eight stations</h2>
          <ul className="mt-5 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
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

        <aside className="flex flex-col gap-8 self-start">
          <div>
            <p className="label">Waitlist</p>
            <p className="mt-2 mb-4 text-sm text-ink-soft">
              This list is the decision. If it fills, the app gets built; if it
              does not, it does not — and you will have lost nothing.
            </p>
            <WaitlistForm />
          </div>

          <div className="border-l-2 border-line bg-panel px-4 py-3">
            <p className="board-sm text-sm">Before then</p>
            <p className="mt-1 text-sm text-ink-soft">
              The{" "}
              <Link href="/avatar" className="text-signal">
                video avatar
              </Link>{" "}
              answers training questions by the session, and every split from
              every race is free on the{" "}
              <Link href="/races" className="text-signal">
                races page
              </Link>{" "}
              for free.
            </p>
          </div>

          <p className="text-xs text-muted">
            The app will not be medical advice or personal coaching. Anything it
            generates is general training information — check with a
            professional before acting on it. Questions: {siteConfig.contactEmail}.
          </p>
        </aside>
      </div>
    </>
  );
}

function StoreSlot({ platform, store }: { platform: string; store: string }) {
  return (
    <li className="flex items-center justify-between gap-4 bg-panel px-5 py-5">
      <span>
        <span className="board-sm block text-base">{platform}</span>
        <span className="text-sm text-muted">{store}</span>
      </span>
      <span className="label !text-signal">Not yet</span>
    </li>
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
    <li className="bg-panel px-5 py-4">
      <span className="tnum text-xs text-signal">{n}</span>
      <p className="board-sm mt-1 text-base">{title}</p>
      <p className="mt-1 max-w-xl text-sm text-ink-soft">{children}</p>
    </li>
  );
}
