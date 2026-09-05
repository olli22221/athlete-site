import { SEGMENTS } from "@/lib/races";

// A phone drawn in CSS, showing a concept screen of the plan view. It is a
// mock, and it says so on the page: there is no app to screenshot yet, and a
// fabricated screenshot would promise a UI that does not exist.
export default function PhoneMockup() {
  const stations = SEGMENTS.filter((segment) => segment.kind === "station").slice(0, 3);

  return (
    <div className="relative mx-auto w-[280px]">
      {/* frame */}
      <div className="rounded-[2.6rem] border-[6px] border-ink/80 bg-ground p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,.6)]">
        {/* notch */}
        <div className="mx-auto mb-2 h-5 w-24 rounded-full bg-ink/80" />

        {/* screen */}
        <div className="flex h-[520px] flex-col gap-3 overflow-hidden rounded-[2rem] bg-panel p-4">
          <div className="flex items-baseline justify-between">
            <span className="label">Week 3 · Day 2</span>
            <span className="tnum text-[10px] text-muted">Target 59:30</span>
          </div>

          <div>
            <p className="board-sm text-lg">Compromised running</p>
            <p className="mt-1 text-xs text-muted">4 × (sled push 25 m → 800 m run)</p>
          </div>

          <div className="mt-1 flex flex-col gap-px bg-line">
            {[
              ["Warm-up", "10:00", "easy"],
              ["Sled push", "25 m", "race weight"],
              ["Run", "800 m", "4:05 /km"],
              ["Rest", "2:00", ""],
            ].map(([what, how, note]) => (
              <div key={what} className="flex items-baseline justify-between bg-panel-2 px-3 py-2">
                <span className="text-xs">{what}</span>
                <span className="flex items-baseline gap-2">
                  <span className="tnum text-xs">{how}</span>
                  {note && <span className="text-[10px] text-muted">{note}</span>}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2">
            <span className="label">Your weakest stations</span>
            <ul className="mt-2 flex flex-col gap-1.5">
              {stations.map((station, index) => (
                <li key={station.id} className="flex items-center gap-2">
                  <span className="h-1.5 flex-1 overflow-hidden bg-line">
                    <span
                      className="block h-full bg-over"
                      style={{ width: `${[72, 55, 38][index]}%` }}
                    />
                  </span>
                  <span className="tnum w-14 text-right text-[10px] text-ink-soft">
                    {station.short}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-line pt-3">
            <span className="text-[10px] text-muted">Log session</span>
            <span className="board-sm rounded-sm bg-signal px-3 py-1.5 text-[10px] text-signal-ink">
              Start
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] text-muted">Concept screen — not the final UI</p>
    </div>
  );
}
