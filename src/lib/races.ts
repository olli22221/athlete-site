// ---------------------------------------------------------------------------
// The race calendar, results and splits.
//
// This one file feeds the splitboard on the homepage, the /races page and the
// SportsEvent structured data — so a race added here shows up everywhere,
// including in search results and AI answers, without touching a component.
//
// The numbers below are EXAMPLES while `siteConfig.isPlaceholder` is true.
// ---------------------------------------------------------------------------

/** The 16 segments of a Hyrox race, in the order they are run. */
export const SEGMENTS = [
  { id: "run-1", kind: "run", label: "Run 1", short: "R1" },
  { id: "ski", kind: "station", label: "SkiErg", short: "SKI", detail: "1000 m" },
  { id: "run-2", kind: "run", label: "Run 2", short: "R2" },
  { id: "push", kind: "station", label: "Sled Push", short: "PUSH", detail: "50 m" },
  { id: "run-3", kind: "run", label: "Run 3", short: "R3" },
  { id: "pull", kind: "station", label: "Sled Pull", short: "PULL", detail: "50 m" },
  { id: "run-4", kind: "run", label: "Run 4", short: "R4" },
  { id: "burpee", kind: "station", label: "Burpee Broad Jump", short: "BBJ", detail: "80 m" },
  { id: "run-5", kind: "run", label: "Run 5", short: "R5" },
  { id: "row", kind: "station", label: "Row", short: "ROW", detail: "1000 m" },
  { id: "run-6", kind: "run", label: "Run 6", short: "R6" },
  { id: "carry", kind: "station", label: "Farmers Carry", short: "CARRY", detail: "200 m" },
  { id: "run-7", kind: "run", label: "Run 7", short: "R7" },
  { id: "lunges", kind: "station", label: "Sandbag Lunges", short: "LUNGE", detail: "100 m" },
  { id: "run-8", kind: "run", label: "Run 8", short: "R8" },
  { id: "wallballs", kind: "station", label: "Wall Balls", short: "WB", detail: "100 reps" },
] as const;

export type SegmentId = (typeof SEGMENTS)[number]["id"];
export type Division = "open" | "pro";

export type Race = {
  slug: string;
  /** How the event is actually billed, for the calendar and the hero card. */
  event: string;
  city: string;
  country: string;
  venue: string;
  /** ISO date of race day. */
  date: string;
  division: Division;
  /** What this race is for — shown on the calendar. */
  role: string;
  /** Present once the race has been run. */
  result?: {
    totalSeconds: number;
    /** Time spent between stations. The split nobody trains and everybody loses. */
    roxzoneSeconds: number;
    placeOverall?: number;
    fieldSize?: number;
    splits: Partial<Record<SegmentId, number>>;
    /** Link to the race film, once it is up. */
    filmUrl?: string;
    note?: string;
  };
};

export const races: Race[] = [
  {
    slug: "karlsruhe-2026",
    event: "HYROX Karlsruhe",
    city: "Karlsruhe",
    country: "Germany",
    venue: "Messe Karlsruhe",
    date: "2026-10-03",
    division: "open",
    role: "Baseline — the honest starting number",
    result: {
      totalSeconds: 4127,
      roxzoneSeconds: 402,
      placeOverall: 214,
      fieldSize: 1840,
      note: "Went out too hard on runs 1–3 and paid for it at the wall balls.",
      splits: {
        "run-1": 232, ski: 258, "run-2": 251, push: 196,
        "run-3": 258, pull: 241, "run-4": 264, burpee: 289,
        "run-5": 271, row: 246, "run-6": 278, carry: 152,
        "run-7": 285, lunges: 214, "run-8": 297, wallballs: 393,
      },
    },
  },
  {
    slug: "hamburg-2026",
    event: "HYROX Hamburg",
    city: "Hamburg",
    country: "Germany",
    venue: "Hamburg Messe",
    date: "2026-10-31",
    division: "open",
    role: "Pacing test — one variable changed: the roxzone",
    result: {
      totalSeconds: 3908,
      roxzoneSeconds: 268,
      placeOverall: 121,
      fieldSize: 2260,
      note: "Roxzone down 134 seconds without being any fitter. Cheapest time of the season.",
      splits: {
        "run-1": 244, ski: 252, "run-2": 249, push: 188,
        "run-3": 251, pull: 233, "run-4": 253, burpee: 271,
        "run-5": 256, row: 241, "run-6": 261, carry: 148,
        "run-7": 264, lunges: 205, "run-8": 268, wallballs: 355,
      },
    },
  },
  {
    slug: "frankfurt-2026",
    event: "HYROX Frankfurt",
    city: "Frankfurt",
    country: "Germany",
    venue: "Messe Frankfurt",
    date: "2026-12-12",
    division: "open",
    role: "Qualification attempt #1",
  },
  {
    slug: "abroad-2027-02",
    event: "HYROX — venue to be confirmed",
    city: "To be confirmed",
    country: "Abroad",
    venue: "TBC",
    date: "2027-02-20",
    division: "pro",
    role: "Pro debut — if the standard is met",
  },
];

// --- derived ---------------------------------------------------------------

export function finishedRaces(): Race[] {
  return races
    .filter((race) => race.result)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function upcomingRaces(now: Date = new Date()): Race[] {
  const today = now.toISOString().slice(0, 10);
  return races
    .filter((race) => !race.result && race.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function nextRace(now?: Date): Race | undefined {
  return upcomingRaces(now)[0];
}

/** Fastest finish so far, or undefined before the first race. */
export function personalBest(): Race | undefined {
  const done = races.filter((race) => race.result);
  if (done.length === 0) return undefined;
  return done.reduce((best, race) =>
    race.result!.totalSeconds < best.result!.totalSeconds ? race : best
  );
}

/** Seconds still to find. Negative once the target is beaten. */
export function gapToTarget(targetSeconds: number): number | undefined {
  const best = personalBest();
  return best ? best.result!.totalSeconds - targetSeconds : undefined;
}

export function formatClock(totalSeconds: number): string {
  const sign = totalSeconds < 0 ? "-" : "";
  const abs = Math.abs(Math.round(totalSeconds));
  const minutes = Math.floor(abs / 60);
  const seconds = abs % 60;
  return `${sign}${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function daysUntil(iso: string, now: Date = new Date()): number {
  const target = Date.parse(`${iso}T12:00:00Z`);
  return Math.ceil((target - now.getTime()) / 86_400_000);
}

/** Total of the eight runs, which is where most of a race is won or lost. */
export function runTotal(race: Race): number | undefined {
  if (!race.result) return undefined;
  return SEGMENTS.filter((s) => s.kind === "run").reduce(
    (sum, s) => sum + (race.result!.splits[s.id] ?? 0),
    0
  );
}
