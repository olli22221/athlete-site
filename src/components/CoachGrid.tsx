import Image from "next/image";
import { coaches } from "@/lib/coaches";
import Reveal from "@/components/Reveal";

export default function CoachGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {coaches.map((coach, i) => (
        <Reveal key={coach.id} delay={i * 0.07}>
          <article className="group h-full overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-accent/40">
            <div
              className="relative flex aspect-[4/5] items-center justify-center overflow-hidden"
              style={{
                background: `linear-gradient(150deg, ${coach.gradient[0]}, ${coach.gradient[1]})`,
              }}
            >
              {coach.image ? (
                <Image
                  src={coach.image}
                  alt={coach.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <span className="font-display text-7xl text-white/12">
                  {coach.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              )}
            </div>

            <div className="p-6">
              <h3 className="font-display text-xl tracking-wide">
                {coach.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-accent">
                {coach.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {coach.bio}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {coach.certs.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-line px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-muted"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
