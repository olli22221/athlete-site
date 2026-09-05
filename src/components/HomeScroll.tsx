"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { ArrowRight, ChevronDown, MessageSquare } from "lucide-react";
import { formatDate, nextRace } from "@/lib/races";
import { siteConfig } from "@/lib/site-config";

const BEATS = [
  {
    heading: "One season, one threshold",
    body: "Race Open through the autumn, get under the qualifying standard, race Pro from February. That is the whole plan.",
  },
  {
    heading: "Every race filmed",
    body: "The journey, the course walk the night before, the race itself, and the honest bit afterwards — including the races that miss.",
  },
  {
    heading: "Every split published",
    body: "Station times, run splits and the roxzone, in full. The numbers are the only part of this that cannot be exaggerated.",
  },
];

// One continuous scroll. The footage stays pinned for the whole opener and
// moves with the scroll — a slow push-in and drift — while the first screen
// (name, next race, avatar) pulls away and the three beats pass over it.
//
// Scroll progress drives everything from a single value, so nothing can
// fall out of step. Under reduced motion the pin is dropped and the same
// content stacks as ordinary sections.
export default function HomeScroll() {
  const container = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // The first quarter is the opener; the remaining three quarters are the
  // beats. -1 means "still on the opener".
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = value < 0.22 ? -1 : Math.min(BEATS.length - 1, Math.floor((value - 0.22) / 0.26));
    if (next !== active) setActive(next);
  });

  // Footage: a slow push-in and upward drift across the whole scroll.
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  // The overlay deepens once the beats start, so text stays legible.
  const shade = useTransform(scrollYProgress, [0, 0.18, 0.3], [0.35, 0.45, 0.72]);

  // The opener pulls up and fades as the beats take over.
  const openerY = useTransform(scrollYProgress, [0, 0.22], [0, -120]);
  const openerOpacity = useTransform(scrollYProgress, [0, 0.14, 0.22], [1, 1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  // Scroll-linked opacity goes through a CSS variable, not the `opacity`
  // key. Framer hands a scroll-driven `opacity` to the browser's scroll
  // timeline where it can, and that timeline does not honour this container's
  // offsets — the value it produced was wrong and the inline style never
  // changed. A custom property is written as a plain style, every frame.
  const shadeStyle = { "--o": shade } as unknown as MotionStyle;
  const openerStyle = { y: openerY, "--o": openerOpacity } as unknown as MotionStyle;
  const cueStyle = { "--o": cueOpacity } as unknown as MotionStyle;

  if (reduced) return <StaticOpener />;

  return (
    <div ref={container} className="relative h-[400svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* footage */}
        <motion.div style={{ scale: mediaScale, y: mediaY }} className="absolute inset-0">
          <Footage />
        </motion.div>
        <motion.div
          aria-hidden="true"
          style={shadeStyle}
          className="absolute inset-0 bg-ground opacity-(--o)"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ground to-transparent"
        />

        {/* opener */}
        <motion.div
          style={openerStyle}
          className="absolute inset-0 flex flex-col justify-end opacity-(--o)"
        >
          <Opener />
        </motion.div>

        <motion.div
          style={cueStyle}
          className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center opacity-(--o)"
        >
          <ChevronDown size={18} className="animate-bounce text-muted" />
        </motion.div>

        {/* beats */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1400px] px-4">
            <div className="relative min-h-[16rem] max-w-xl">
              <AnimatePresence mode="wait" initial={false}>
                {active >= 0 && (
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0 top-0"
                  >
                    <p className="label !text-signal">
                      {String(active + 1).padStart(2, "0")} /{" "}
                      {String(BEATS.length).padStart(2, "0")}
                    </p>
                    <h2 className="board mt-3 text-[clamp(2rem,5vw,3.5rem)]">
                      {BEATS[active].heading}
                    </h2>
                    <p className="mt-4 text-lg text-ink-soft">{BEATS[active].body}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- pieces ----------------------------------------------------------------

function Footage() {
  const { heroVideo, heroPoster } = siteConfig.media;

  if (heroVideo) {
    return (
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
    );
  }
  if (heroPoster) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={heroPoster} alt="" className="h-full w-full object-cover" />;
  }
  // Marked placeholder until real footage exists — an empty box reads as a
  // bug, and a stock photo reads as a lie.
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

function Opener() {
  const next = nextRace();
  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-4 pb-12 sm:pb-16">
      <div>
        <p className="label !text-ink-soft">
          {siteConfig.athlete.role} · {siteConfig.athlete.nationality}
        </p>
        <h1 className="board mt-4 text-[clamp(3rem,11vw,8rem)]">{siteConfig.athlete.name}</h1>
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
  );
}

// Reduced motion: no pin, no parallax, the same content as plain sections.
function StaticOpener() {
  return (
    <>
      <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <Footage />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ground via-ground/55 to-ground/20" />
        </div>
        <div className="relative pt-32">
          <Opener />
        </div>
      </section>
      <section className="mx-auto max-w-[1400px] px-4 py-20">
        <div className="flex flex-col gap-12">
          {BEATS.map((beat, index) => (
            <div key={beat.heading} className="max-w-xl">
              <p className="label !text-signal">
                {String(index + 1).padStart(2, "0")} / {String(BEATS.length).padStart(2, "0")}
              </p>
              <h2 className="board mt-3 text-3xl">{beat.heading}</h2>
              <p className="mt-3 text-lg text-ink-soft">{beat.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
