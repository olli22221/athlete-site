"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { scenes, type Scene } from "@/lib/scenes";

/**
 * A scroll-pinned cinematic sequence.
 *
 * The outer section is `scenes.length * 100vh` tall; the inner container is
 * sticky, so the viewport holds still while scroll progress cross-fades the
 * stacked scene layers and slowly pushes each image in (Ken Burns).
 *
 * Each scene owns a 1/n slice of the scroll range, with a crossfade that
 * overlaps its neighbours so no frame ever hard-cuts.
 */
export default function CinematicScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={ref}
      aria-label="Cinematic training journey"
      style={{ height: `${scenes.length * 100}vh` }}
      className="relative bg-background"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {scenes.map((scene, i) => (
          <SceneLayer
            key={scene.id}
            scene={scene}
            index={i}
            total={scenes.length}
            progress={scrollYProgress}
          />
        ))}

        {/* letterbox bars — the single strongest "this is cinema" cue */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[7vh] bg-black" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[7vh] bg-black" />

        <ProgressRail progress={scrollYProgress} />
      </div>
    </section>
  );
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Linear 0→1 ramp across [a, b], clamped at both ends. */
const ramp = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

function sceneWindow(index: number, total: number) {
  const step = 1 / total;
  const fade = step * 0.32;
  return {
    step,
    fade,
    start: index * step,
    end: index * step + step,
    isFirst: index === 0,
    isLast: index === total - 1,
  };
}

/**
 * Opacity of scene `index` at overall scroll progress `p`.
 *
 * Deliberately a plain scalar function rather than a keyframe array so the
 * behaviour at the range edges is explicit: the first scene is already fully
 * visible at p=0 and the last stays visible through p=1, and neither can
 * reappear outside its own window.
 */
function sceneOpacity(p: number, index: number, total: number) {
  const { start, end, fade, isFirst, isLast } = sceneWindow(index, total);
  const fadeIn = isFirst ? 1 : ramp(p, start - fade, start + fade);
  const fadeOut = isLast ? 1 : 1 - ramp(p, end - fade, end + fade);
  return Math.min(fadeIn, fadeOut);
}

/** 0→1 position of `p` across the scene's full window, including its fades. */
function sceneTravel(p: number, index: number, total: number) {
  const { start, end, fade } = sceneWindow(index, total);
  return ramp(p, start - fade, end + fade);
}

function SceneLayer({
  scene,
  index,
  total,
  progress,
}: {
  scene: Scene;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();

  const opacity = useTransform(progress, (p) => sceneOpacity(p, index, total));
  // slow continuous push-in across the scene's whole window
  const scale = useTransform(progress, (p) =>
    reduce ? 1 : 1.14 - sceneTravel(p, index, total) * 0.14
  );
  // text drifts slightly against the image for depth
  const textY = useTransform(progress, (p) =>
    reduce ? 0 : 48 - sceneTravel(p, index, total) * 96
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      {/* fallback tint — also what shows if the image file isn't there yet */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(150deg, ${scene.gradient[0]}, ${scene.gradient[1]})`,
        }}
      />

      <motion.div style={{ scale }} className="absolute inset-0" aria-hidden>
        <Image
          src={scene.image}
          alt=""
          fill
          sizes="100vw"
          priority={index === 0}
          className="object-cover"
          style={{ objectPosition: scene.focal ?? "50% 50%" }}
        />
      </motion.div>

      {/* grade + legibility scrim — weighted to the bottom-left, where the
          caption sits, so the rest of the frame keeps its contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 35% 65%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div className="grain absolute inset-0" />

      {/* caption block */}
      <motion.div
        style={{ y: textY }}
        className="absolute inset-x-0 bottom-[16vh] z-20 px-6 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-accent">
            <span className="h-px w-10 bg-accent" />
            {scene.kicker}
          </div>
          <h2 className="font-display mt-4 max-w-3xl text-balance text-5xl leading-[0.95] tracking-wide text-foreground drop-shadow-[0_2px_24px_rgba(0,0,0,0.9)] sm:text-7xl lg:text-8xl">
            {scene.headline}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground/80 drop-shadow-[0_1px_12px_rgba(0,0,0,0.9)] sm:text-base">
            {scene.caption}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {scenes.map((scene, i) => (
        <RailTick
          key={scene.id}
          index={i}
          total={scenes.length}
          progress={progress}
        />
      ))}
    </div>
  );
}

function RailTick({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const active = useTransform(progress, (p) => sceneOpacity(p, index, total));
  const opacity = useTransform(active, (v) => 0.25 + v * 0.75);
  const scaleY = useTransform(active, (v) => 0.4 + v * 0.6);

  return (
    <motion.span
      style={{ opacity, scaleY }}
      className="block h-8 w-[3px] origin-center rounded-full bg-accent"
    />
  );
}
