import {
  SEGMENTS,
  formatClock,
  type Race,
  type SegmentId,
} from "@/lib/races";

// The homepage's central object: one race drawn as its sixteen segments, in
// the order they are run. Bar height is the split; colour is the change
// against the previous race, so the picture answers "where did the time go?"
// rather than just "how fast overall".
//
// Runs are outlined and stations are filled, which makes the alternating
// rhythm of a Hyrox race legible before a single number is read.

export default function Splitboard({
  race,
  previous,
}: {
  race: Race;
  previous?: Race;
}) {
  if (!race.result) return null;

  const splits = race.result.splits;
  const values = SEGMENTS.map((segment) => splits[segment.id] ?? 0);
  const max = Math.max(...values, 1);

  return (
    <figure className="border border-line bg-panel">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line px-4 py-3">
        <span className="board-sm text-sm">
          {race.city} · {race.division}
        </span>
        <span className="label">
          Bar height = split · colour = change vs {previous ? previous.city : "n/a"}
        </span>
      </figcaption>

      <div className="overflow-x-auto">
        <div className="flex min-w-[680px] items-end gap-[3px] px-4 pt-8">
          {SEGMENTS.map((segment, index) => {
            const value = splits[segment.id];
            const before = previous?.result?.splits[segment.id as SegmentId];
            const delta = value !== undefined && before !== undefined ? value - before : undefined;

            const tone =
              delta === undefined
                ? "neutral"
                : delta < -2
                  ? "under"
                  : delta > 2
                    ? "over"
                    : "neutral";

            const height = value ? Math.max((value / max) * 100, 6) : 6;
            const isRun = segment.kind === "run";

            const fill =
              tone === "under"
                ? "bg-under"
                : tone === "over"
                  ? "bg-over"
                  : "bg-signal";
            const outline =
              tone === "under"
                ? "border-under"
                : tone === "over"
                  ? "border-over"
                  : "border-signal";

            return (
              <div
                key={segment.id}
                className="group relative flex flex-1 flex-col items-center gap-2"
              >
                <div className="flex h-40 w-full items-end sm:h-52">
                  <div
                    className={`segment-bar w-full ${
                      isRun ? `border ${outline} bg-transparent` : fill
                    }`}
                    style={{
                      height: `${height}%`,
                      animationDelay: `${index * 35}ms`,
                    }}
                  />
                </div>

                <span className="label !text-[9px] !tracking-[0.08em]">
                  {segment.short}
                </span>

                {/* Times stay on the page rather than hiding in a tooltip —
                    they are the content, not a detail. */}
                <span className="tnum text-[10px] text-ink-soft">
                  {value ? formatClock(value) : "—"}
                </span>
                <span
                  className={`tnum text-[10px] ${
                    tone === "under"
                      ? "text-under"
                      : tone === "over"
                        ? "text-over"
                        : "text-muted"
                  }`}
                >
                  {delta === undefined
                    ? ""
                    : delta === 0
                      ? "±0"
                      : `${delta > 0 ? "+" : ""}${formatClock(delta)}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line px-4 py-3">
        <Legend swatch="border border-signal" text="Run" />
        <Legend swatch="bg-signal" text="Station" />
        <Legend swatch="bg-under" text="Faster than last race" />
        <Legend swatch="bg-over" text="Slower" />
      </div>
    </figure>
  );
}

function Legend({ swatch, text }: { swatch: string; text: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`h-3 w-3 ${swatch}`} />
      <span className="label !text-[10px]">{text}</span>
    </span>
  );
}
