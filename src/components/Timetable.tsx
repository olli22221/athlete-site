"use client";

import { useState } from "react";
import { Clock, Flame } from "lucide-react";
import {
  classTypes,
  days,
  sessionsFor,
  type ClassTypeId,
  type Day,
} from "@/lib/schedule";

export default function Timetable() {
  const [day, setDay] = useState<Day>(days[0]);
  const [filter, setFilter] = useState<ClassTypeId | "all">("all");

  const sessions = sessionsFor(day).filter(
    (s) => filter === "all" || s.type === filter
  );

  return (
    <div>
      {/* day tabs */}
      <div className="mask-fade-x -mx-6 overflow-x-auto px-6 lg:mx-0 lg:overflow-visible lg:px-0">
        <div className="flex min-w-max gap-2 lg:min-w-0">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={`rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition-colors ${
                day === d
                  ? "border-accent bg-accent text-black"
                  : "border-line text-muted hover:border-accent/50 hover:text-foreground"
              }`}
            >
              <span className="lg:hidden">{d.slice(0, 3)}</span>
              <span className="hidden lg:inline">{d}</span>
            </button>
          ))}
        </div>
      </div>

      {/* class-type filter */}
      <div className="mt-5 flex flex-wrap gap-2">
        <FilterChip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label="All classes"
        />
        {Object.values(classTypes).map((t) => (
          <FilterChip
            key={t.id}
            active={filter === t.id}
            onClick={() => setFilter(t.id)}
            label={t.label}
            color={t.color}
          />
        ))}
      </div>

      {/* sessions */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-line">
        {sessions.length === 0 ? (
          <p className="px-6 py-14 text-center text-sm text-muted">
            No {filter === "all" ? "" : classTypes[filter].label + " "}classes
            on {day}.
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {sessions.map((s, i) => {
              const type = classTypes[s.type];
              return (
                <li
                  key={`${s.time}-${i}`}
                  className="flex items-center gap-4 bg-surface px-5 py-4 transition-colors hover:bg-surface-2 sm:gap-6 sm:px-6"
                  style={{ borderLeft: `3px solid ${type.color}` }}
                >
                  <span className="font-display w-16 shrink-0 text-xl tracking-wide text-foreground sm:w-20 sm:text-2xl">
                    {s.time}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span
                        className="text-sm font-medium"
                        style={{ color: type.color }}
                      >
                        {type.label}
                      </span>
                      {s.popular && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-accent">
                          <Flame size={10} />
                          Fills up
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-muted">
                      Coach {s.coach}
                    </span>
                  </span>

                  <span className="hidden items-center gap-1.5 text-xs text-muted sm:flex">
                    <Clock size={13} />
                    60 min
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* legend */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(classTypes).map((t) => (
          <div key={t.id} className="flex gap-3">
            <span
              className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
              style={{ background: t.color }}
            />
            <p className="text-xs leading-relaxed text-muted">
              <span className="text-foreground">{t.label}</span> — {t.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs transition-colors ${
        active
          ? "border-foreground/40 bg-foreground/10 text-foreground"
          : "border-line text-muted hover:text-foreground"
      }`}
    >
      {color && (
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: color }}
        />
      )}
      {label}
    </button>
  );
}
