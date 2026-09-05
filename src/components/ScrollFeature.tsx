"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
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

// The scroll feature: footage pinned in place while three lines pass over it.
//
// Scroll progress picks exactly one active beat and AnimatePresence handles
// the handoff, so two beats can never be on screen at once — a crossfade
// built from overlapping opacity ranges is easy to get subtly wrong, and
// this cannot be. Under reduced motion the pin goes and the beats stack.
export default function ScrollFeature() {
  const container = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(BEATS.length - 1, Math.floor(value * BEATS.length));
    if (next !== active) setActive(next);
  });

  const { featureVideo, heroPoster } = siteConfig.media;

  if (reduced) {
    return (
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
    );
  }

  const beat = BEATS[active];

  return (
    <div ref={container} className="relative h-[300svh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="absolute inset-0">
          {featureVideo ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={heroPoster || undefined}
            >
              <source src={featureVideo} />
            </video>
          ) : (
            <div className="flex h-full w-full items-start justify-center bg-panel pt-[14svh]">
              <span className="label">feature.mp4 — see public/media/README.md</span>
            </div>
          )}
          <div aria-hidden="true" className="absolute inset-0 bg-ground/72" />
        </div>

        <div className="relative mx-auto w-full max-w-[1400px] px-4">
          {/* Fixed-height stage so a shorter beat does not shift the layout. */}
          <div className="relative min-h-[16rem] max-w-xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-0"
              >
                <p className="label !text-signal">
                  {String(active + 1).padStart(2, "0")} / {String(BEATS.length).padStart(2, "0")}
                </p>
                <h2 className="board mt-3 text-[clamp(2rem,5vw,3.5rem)]">{beat.heading}</h2>
                <p className="mt-4 text-lg text-ink-soft">{beat.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
