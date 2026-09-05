import Link from "next/link";
import {
  daysUntil,
  formatClock,
  gapToTarget,
  nextRace,
  personalBest,
} from "@/lib/races";
import { siteConfig } from "@/lib/site-config";

// The signature element: a thin strip of live season state that rides above
// every page. Four numbers, always the same four, always in the same place —
// season, next race, best time, distance to the standard. It is the site's
// argument in one line, and it costs a reader nothing to check.
export default function TelemetryBar() {
  const next = nextRace();
  const best = personalBest();
  const gap = gapToTarget(siteConfig.target.seconds);

  return (
    <div className="border-b border-line bg-panel">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-stretch divide-line text-xs sm:divide-x">
        <Cell label="Season" value={siteConfig.season} />

        <Cell
          label="Next race"
          value={next ? `${next.city}` : "—"}
          detail={next ? `T−${daysUntil(next.date)} days` : "No race scheduled"}
          href="/races"
        />

        <Cell
          label="Best"
          value={best ? formatClock(best.result!.totalSeconds) : "—"}
          detail={best ? `${best.city} ${best.date.slice(0, 4)}` : "No result yet"}
        />

        <Cell
          label="To standard"
          value={
            gap === undefined
              ? "—"
              : gap <= 0
                ? `${formatClock(gap)} under`
                : `+${formatClock(gap)}`
          }
          detail={siteConfig.target.label}
          tone={gap === undefined ? "neutral" : gap <= 0 ? "under" : "over"}
        />
      </div>
    </div>
  );
}

function Cell({
  label,
  value,
  detail,
  href,
  tone = "neutral",
}: {
  label: string;
  value: string;
  detail?: string;
  href?: string;
  tone?: "neutral" | "under" | "over";
}) {
  const toneClass =
    tone === "under" ? "text-under" : tone === "over" ? "text-over" : "text-ink";

  const body = (
    <div className="flex min-w-0 flex-1 flex-col gap-0.5 px-4 py-2">
      <span className="label">{label}</span>
      <span className="flex flex-wrap items-baseline gap-x-2">
        <span className={`tnum text-sm font-medium ${toneClass}`}>{value}</span>
        {detail && <span className="truncate text-[11px] text-muted">{detail}</span>}
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="flex flex-1 hover:bg-panel-2">
        {body}
      </Link>
    );
  }
  return <div className="flex flex-1">{body}</div>;
}
