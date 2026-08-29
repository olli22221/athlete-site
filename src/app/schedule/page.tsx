import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import Kicker from "@/components/Kicker";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import Timetable from "@/components/Timetable";
import { siteConfig } from "@/lib/site-config";
import { totalWeeklyClasses } from "@/lib/schedule";

export const metadata: Metadata = {
  title: `Timetable — ${siteConfig.fullName}`,
  description:
    "Weekly CrossFit, Hyrox, Strength and Open Gym class timetable.",
};

export default function SchedulePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-background pb-12 pt-40">
        <CinematicBackdrop variant="section" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <Kicker>Timetable</Kicker>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-5 max-w-2xl text-balance text-5xl leading-tight sm:text-6xl">
              {totalWeeklyClasses()} classes. Seven days.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-muted">
              Every session is coached from warm-up to cool-down and scaled to
              whoever is in the room. Booking opens 48 hours ahead — the 6am
              and 17:30 slots fill fastest.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-background pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Timetable />

          <Reveal>
            <div className="mt-14 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-8">
              <p className="flex-1 text-sm text-muted">
                New to CrossFit or Hyrox? Start with the On-Ramp — four
                sessions that teach the movements before you join a regular
                class.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-black transition-transform hover:-translate-y-0.5"
              >
                Book your free class
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
