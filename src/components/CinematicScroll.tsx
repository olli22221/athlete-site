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

function sceneRanges(index: number, total: number) {
  const step = 1 / total;
  const fade = step * 0.32;
  const start = index * step;
  const end = start + step;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const input: number[] = [];
  const output: number[] = [];

  if (isFirst) {
    input.push(0);
    output.push(1);
  } else {
    input.push(start - fade, start + fade);
    output.push(0, 1);
  }

  if (isLast) {
    input.push(1);
    output.push(1);
  } else {
    input.push(end - fade, end + fade);
    output.push(1, 0);
  }

  return { step, fade, start, end, input, output };
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
  const { fade, start, end, input, output } = sceneRanges(index, total);

  const opacity = useTransform(progress, input, output);
  // slow continuous push-in across the scene's whole window
  const scale = useTransform(
    progress,
    [start - fade, end + fade],
    reduce ? [1, 1] : [1.14, 1.0]
  );
  // text drifts slightly against the image for depth
  const textY = useTransform(
    progress,
    [start - fade, end + fade],
    reduce ? [0, 0] : [48, -48]
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

      {/* grade + legibility scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 60%, transparent 30%, rgba(0,0,0,0.75) 100%)",
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
          <h2 className="font-display mt-4 max-w-3xl text-balance text-5xl leading-[0.95] tracking-wide text-foreground sm:text-7xl lg:text-8xl">
            {scene.headline}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground/70 sm:text-base">
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
        <RailTick key={scene.id} index={i} total={scenes.length} progress={progress} />
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
  const { input, output } = sceneRanges(index, total);
  const opacity = useTransform(progress, input, output);
  const dim = useTransform(opacity, (v) => 0.25 + v * 0.75);
  const scaleY = useTransform(opacity, (v) => 0.4 + v * 0.6);

  return (
    <motion.span
      style={{ opacity: dim, scaleY }}
      className="block h-8 w-[3px] origin-center rounded-full bg-accent"
    />
  );
}
