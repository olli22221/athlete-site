import Link from "next/link";
import Splitboard from "@/components/Splitboard";
import Reveal from "@/components/Reveal";
import {
  SEGMENTS,
  daysUntil,
  finishedRaces,
  formatClock,
  formatDate,
  gapToTarget,
  nextRace,
  personalBest,
  runTotal,
  upcomingRaces,
} from "@/lib/races";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  const done = finishedRaces();
  const latest = done[0];
  const previous = done[1];
  const best = personalBest();
  const gap = gapToTarget(siteConfig.target.seconds);
  const next = nextRace();
  const upcoming = upcomingRaces().slice(0, 3);

  const runSeconds = latest ? runTotal(latest) : undefined;
  const runShare =
    latest && runSeconds ? Math.round((runSeconds / latest.result!.totalSeconds) * 100) : undefined;

  return (
    <>
      {/* --- opener ------------------------------------------------------ */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 lg:grid-cols-[1.05fr_1fr] lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="label">
              {siteConfig.athlete.name} · {siteConfig.athlete.nationality} ·{" "}
              {siteConfig.athlete.ageGroup}
            </p>
            <h1 className="board mt-4 text-[clamp(2.25rem,5vw,4.25rem)]">
              {siteConfig.tagline}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">{siteConfig.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/races"
                className="board-sm bg-signal px-5 py-3 text-sm text-signal-ink"
              >
                The season
              </Link>
              <Link
                href="/avatar"
                className="board-sm border border-line px-5 py-3 text-sm hover:border-signal hover:text-signal"
              >
                Talk to the avatar
              </Link>
            </div>
          </div>

          {/* The four numbers that define the project. */}
          <dl className="grid grid-cols-2 gap-px self-start border border-line bg-line">
            <Stat
              label="Target"
              value={siteConfig.target.label}
              note={siteConfig.target.note}
            />
            <Stat
              label="Best so far"
              value={best ? formatClock(best.result!.totalSeconds) : "—"}
              note={best ? `${best.city}, ${formatDate(best.date)}` : "First race pending"}
            />
            <Stat
              label="Gap to standard"
              value={gap === undefined ? "—" : gap <= 0 ? formatClock(gap) : `+${formatClock(gap)}`}
              note={gap === undefined ? "No result yet" : gap <= 0 ? "Standard met" : "Still to find"}
              tone={gap === undefined ? "neutral" : gap <= 0 ? "under" : "over"}
            />
            <Stat
              label="Next race"
              value={next ? next.city : "—"}
              note={next ? `${formatDate(next.date)} · T−${daysUntil(next.date)} days` : "Calendar open"}
            />
          </dl>
        </div>
      </section>

      {/* --- the splitboard --------------------------------------------- */}
      {latest && (
        <section className="mx-auto max-w-[1400px] px-4 py-14">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="label">Latest race</p>
                <h2 className="board mt-2 text-4xl sm:text-5xl">
                  {formatClock(latest.result!.totalSeconds)} in {latest.city}
                </h2>
              </div>
              <Link href="/races" className="board-sm text-sm text-signal">
                All races →
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Splitboard race={latest} previous={previous} />
          </Reveal>

          {latest.result?.note && (
            <p className="mt-5 max-w-2xl text-ink-soft">{latest.result.note}</p>
          )}

          {/* Two numbers that are almost never published, and that this site
              exists to publish. */}
          <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3">
            <Panel
              label="Roxzone"
              value={formatClock(latest.result!.roxzoneSeconds)}
              note="Time between stations. The split nobody trains."
            />
            <Panel
              label="Running total"
              value={runSeconds ? formatClock(runSeconds) : "—"}
              note={runShare ? `${runShare}% of the race is the eight runs` : ""}
            />
            <Panel
              label="Field"
              value={
                latest.result!.placeOverall
                  ? `${latest.result!.placeOverall} / ${latest.result!.fieldSize}`
                  : "—"
              }
              note="Overall placing"
            />
          </div>
        </section>
      )}

      {/* --- the race as structure -------------------------------------- */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-[1400px] px-4 py-14">
          <p className="label">The format</p>
          <h2 className="board mt-2 max-w-2xl text-3xl sm:text-4xl">
            Eight runs, eight stations, one clock that never stops
          </h2>
          <ol className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {SEGMENTS.filter((segment) => segment.kind === "station").map(
              (station, index) => (
                <li key={station.id} className="bg-panel p-4">
                  <span className="tnum text-xs text-signal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="board-sm mt-2 text-base">{station.label}</p>
                  <p className="tnum mt-1 text-xs text-muted">{station.detail}</p>
                </li>
              )
            )}
          </ol>
          <p className="mt-6 max-w-2xl text-sm text-muted">
            One kilometre of running before each station. The order never
            changes, which is what makes the splits comparable between races —
            and worth publishing.
          </p>
        </div>
      </section>

      {/* --- calendar ---------------------------------------------------- */}
      {upcoming.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-4 py-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label">Where to find me</p>
              <h2 className="board mt-2 text-3xl sm:text-4xl">Next up</h2>
            </div>
            <Link href="/races" className="board-sm text-sm text-signal">
              Full calendar →
            </Link>
          </div>

          <ul className="border border-line">
            {upcoming.map((race) => (
              <li
                key={race.slug}
                className="grid gap-2 border-b border-line-soft px-4 py-4 last:border-b-0 sm:grid-cols-[130px_1fr_auto] sm:items-center sm:gap-6"
              >
                <span className="tnum text-sm text-muted">{formatDate(race.date)}</span>
                <span>
                  <span className="board-sm text-base">{race.city}</span>
                  <span className="ml-2 text-sm text-muted">{race.venue}</span>
                  <span className="mt-1 block text-sm text-ink-soft">{race.role}</span>
                </span>
                <span className="label !text-signal">{race.division}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

function Stat({
  label,
  value,
  note,
  tone = "neutral",
}: {
  label: string;
  value: string;
  note?: string;
  tone?: "neutral" | "under" | "over";
}) {
  const toneClass =
    tone === "under" ? "text-under" : tone === "over" ? "text-over" : "text-ink";
  return (
    <div className="bg-panel p-5">
      <dt className="label">{label}</dt>
      <dd className={`tnum mt-2 text-2xl sm:text-3xl ${toneClass}`}>{value}</dd>
      {note && <p className="mt-2 text-xs leading-snug text-muted">{note}</p>}
    </div>
  );
}

function Panel({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="bg-panel p-5">
      <p className="label">{label}</p>
      <p className="tnum mt-2 text-3xl">{value}</p>
      {note && <p className="mt-2 text-xs text-muted">{note}</p>}
    </div>
  );
}
