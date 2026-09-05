import type { Metadata } from "next";
import Splitboard from "@/components/Splitboard";
import {
  finishedRaces,
  formatClock,
  formatDate,
  daysUntil,
  runTotal,
  upcomingRaces,
  type Race,
} from "@/lib/races";
import { siteConfig } from "@/lib/site-config";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Races",
  description:
    "Every race of the season: the calendar ahead, and the full splits of every race already run.",
};

export default function RacesPage() {
  const upcoming = upcomingRaces();
  const done = finishedRaces();
  const origin = siteUrl();

  // SportsEvent markup is what puts these dates into search results and AI
  // answers. It is generated from the same array the page renders, so the two
  // can never drift apart.
  const eventSchema = upcoming.map((race) => ({
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `HYROX ${race.city}`,
    startDate: race.date,
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: race.venue,
      address: { "@type": "PostalAddress", addressLocality: race.city, addressCountry: race.country },
    },
    performer: { "@type": "Person", name: siteConfig.athlete.name },
    url: `${origin}/races`,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-12">
          <p className="label">Season {siteConfig.season}</p>
          <h1 className="board mt-3 text-[clamp(2.5rem,7vw,5rem)]">Races</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">
            Where I will be, and what every race so far actually cost in
            seconds. Splits are published in full — including the races that
            went badly, because those are the ones with something in them.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-12">
        <h2 className="board text-3xl">Upcoming</h2>
        {upcoming.length === 0 ? (
          <p className="mt-4 text-muted">No races on the calendar yet.</p>
        ) : (
          <ul className="mt-6 border border-line">
            {upcoming.map((race) => (
              <li
                key={race.slug}
                className="grid gap-2 border-b border-line-soft px-4 py-5 last:border-b-0 sm:grid-cols-[150px_1fr_120px_90px] sm:items-baseline sm:gap-6"
              >
                <span className="tnum text-sm">{formatDate(race.date)}</span>
                <span>
                  <span className="board-sm text-lg">{race.city}</span>
                  <span className="ml-2 text-sm text-muted">
                    {race.venue}, {race.country}
                  </span>
                  <span className="mt-1 block text-sm text-ink-soft">{race.role}</span>
                </span>
                <span className="tnum text-sm text-muted">
                  T−{daysUntil(race.date)} days
                </span>
                <span className="label !text-signal">{race.division}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-20">
        <h2 className="board text-3xl">Results</h2>
        {done.length === 0 ? (
          <p className="mt-4 text-muted">No races run yet this season.</p>
        ) : (
          <div className="mt-6 flex flex-col gap-10">
            {done.map((race, index) => (
              <ResultCard key={race.slug} race={race} previous={done[index + 1]} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function ResultCard({ race, previous }: { race: Race; previous?: Race }) {
  const result = race.result!;
  const runs = runTotal(race);

  return (
    <article>
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
        <div>
          <p className="label">
            {formatDate(race.date)} · {race.venue} · {race.division}
          </p>
          <h3 className="board mt-2 text-3xl sm:text-4xl">
            {race.city} — {formatClock(result.totalSeconds)}
          </h3>
        </div>
        <dl className="flex gap-8">
          <div>
            <dt className="label">Roxzone</dt>
            <dd className="tnum text-lg">{formatClock(result.roxzoneSeconds)}</dd>
          </div>
          <div>
            <dt className="label">Runs</dt>
            <dd className="tnum text-lg">{runs ? formatClock(runs) : "—"}</dd>
          </div>
          <div>
            <dt className="label">Place</dt>
            <dd className="tnum text-lg">
              {result.placeOverall ? `${result.placeOverall}/${result.fieldSize}` : "—"}
            </dd>
          </div>
        </dl>
      </header>

      {result.note && <p className="mt-4 max-w-2xl text-ink-soft">{result.note}</p>}

      <div className="mt-6">
        <Splitboard race={race} previous={previous} />
      </div>
    </article>
  );
}
