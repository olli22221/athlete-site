import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { formatDate, nextRace } from "@/lib/races";
import { siteConfig } from "@/lib/site-config";

// The opener: the athlete, and almost nothing else.
//
// Three things sit on top of the footage, in the corners where people look for
// them — the name, the next race, and the way into the avatar. Everything
// measurable lives on /races, where someone has gone looking for it.
export default function Hero() {
  const next = nextRace();
  const { heroVideo, heroPoster } = siteConfig.media;

  return (
    <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        {heroVideo ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={heroPoster || undefined}
          >
            <source src={heroVideo} />
          </video>
        ) : heroPoster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroPoster} alt="" className="h-full w-full object-cover" />
        ) : (
          <MediaPlaceholder />
        )}

        {/* Legibility, not decoration: the corners carry text over footage
            whose brightness is unknown, so they get their own gradient. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ground via-ground/55 to-ground/20"
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-4 pb-10 pt-32 sm:pb-14">
        <div>
          <p className="label !text-ink-soft">
            {siteConfig.athlete.role} · {siteConfig.athlete.nationality}
          </p>
          <h1 className="board mt-4 text-[clamp(3rem,11vw,8rem)]">
            {siteConfig.athlete.name}
          </h1>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          {next ? (
            <Link
              href="/races"
              className="group flex max-w-sm flex-col gap-1 border-l-2 border-signal bg-ground/70 px-4 py-3 backdrop-blur-sm hover:bg-ground/90"
            >
              <span className="label !text-signal">Racing next</span>
              <span className="board-sm text-lg">{next.event}</span>
              <span className="tnum text-sm text-ink-soft">
                {formatDate(next.date)} · {next.city}
              </span>
              <span className="mt-1 flex items-center gap-1.5 text-xs text-muted group-hover:text-signal">
                Full calendar <ArrowRight size={13} />
              </span>
            </Link>
          ) : (
            <span />
          )}

          <Link
            href="/avatar"
            className="board-sm flex items-center gap-2 self-start bg-signal px-5 py-3.5 text-sm text-signal-ink sm:self-auto"
          >
            <MessageSquare size={16} />
            Talk to my avatar
          </Link>
        </div>
      </div>
    </section>
  );
}

// Shown until real footage exists. Marked as a placeholder rather than dressed
// up as a photograph — an empty grey box reads as a bug, and a fake one reads
// as a lie.
function MediaPlaceholder() {
  return (
    <div className="flex h-full w-full items-start justify-center bg-panel pt-[22svh]">
      <div className="flex flex-col items-center gap-3 border border-dashed border-line px-8 py-8 text-center">
        <span className="label">Hero media</span>
        <span className="max-w-xs text-sm text-muted">
          Drop <code className="text-signal">hero.mp4</code> into{" "}
          <code className="text-signal">public/media/</code> and point{" "}
          <code className="text-signal">siteConfig.media</code> at it.
        </span>
      </div>
    </div>
  );
}
