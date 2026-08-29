// ---------------------------------------------------------------------------
// Weekly class timetable.
//
// Edit `classTypes` to change the colour/label of a class category, and
// `schedule` to change the actual sessions. The timetable UI derives days and
// ordering from this data, so adding a session is a one-line change.
// ---------------------------------------------------------------------------

export type ClassTypeId =
  | "crossfit"
  | "hyrox"
  | "strength"
  | "open"
  | "onramp";

export type ClassType = {
  id: ClassTypeId;
  label: string;
  /** Tailwind-friendly accent used for the pill + left border */
  color: string;
  description: string;
};

export const classTypes: Record<ClassTypeId, ClassType> = {
  crossfit: {
    id: "crossfit",
    label: "CrossFit",
    color: "#cdff4d",
    description:
      "The daily WOD. Strength or skill work followed by a conditioning piece, scaled to every level.",
  },
  hyrox: {
    id: "hyrox",
    label: "Hyrox",
    color: "#4dd2ff",
    description:
      "Race-specific conditioning: sled work, wall balls, burpee broad jumps, farmers carries and running.",
  },
  strength: {
    id: "strength",
    label: "Strength",
    color: "#ffa64d",
    description:
      "Dedicated barbell cycles. Squat, press, deadlift and Olympic lifts with progressive loading.",
  },
  open: {
    id: "open",
    label: "Open Gym",
    color: "#9a9a95",
    description:
      "Train your own programme with a coach on the floor. Ideal for accessory work or making up a missed session.",
  },
  onramp: {
    id: "onramp",
    label: "On-Ramp",
    color: "#ff6b4d",
    description:
      "Four-session beginner course covering the core movements before you join regular classes.",
  },
};

export type Session = {
  time: string;
  /** 24h start, used only for sorting */
  sort: number;
  type: ClassTypeId;
  coach: string;
  /** Sessions that commonly sell out — surfaced in the UI */
  popular?: boolean;
};

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type Day = (typeof days)[number];

export const schedule: Record<Day, Session[]> = {
  Monday: [
    { time: "06:00", sort: 600, type: "crossfit", coach: "Marcus", popular: true },
    { time: "07:00", sort: 700, type: "crossfit", coach: "Marcus" },
    { time: "09:30", sort: 930, type: "strength", coach: "Ivy" },
    { time: "12:00", sort: 1200, type: "crossfit", coach: "Ivy" },
    { time: "17:30", sort: 1730, type: "hyrox", coach: "Dane", popular: true },
    { time: "18:30", sort: 1830, type: "crossfit", coach: "Dane" },
    { time: "19:30", sort: 1930, type: "open", coach: "Dane" },
  ],
  Tuesday: [
    { time: "06:00", sort: 600, type: "hyrox", coach: "Dane" },
    { time: "07:00", sort: 700, type: "crossfit", coach: "Dane" },
    { time: "09:30", sort: 930, type: "crossfit", coach: "Ivy" },
    { time: "12:00", sort: 1200, type: "open", coach: "Ivy" },
    { time: "17:30", sort: 1730, type: "strength", coach: "Marcus" },
    { time: "18:30", sort: 1830, type: "crossfit", coach: "Marcus", popular: true },
    { time: "19:30", sort: 1930, type: "onramp", coach: "Rae" },
  ],
  Wednesday: [
    { time: "06:00", sort: 600, type: "crossfit", coach: "Marcus", popular: true },
    { time: "07:00", sort: 700, type: "crossfit", coach: "Marcus" },
    { time: "09:30", sort: 930, type: "hyrox", coach: "Dane" },
    { time: "12:00", sort: 1200, type: "crossfit", coach: "Ivy" },
    { time: "17:30", sort: 1730, type: "hyrox", coach: "Dane" },
    { time: "18:30", sort: 1830, type: "crossfit", coach: "Rae" },
    { time: "19:30", sort: 1930, type: "open", coach: "Rae" },
  ],
  Thursday: [
    { time: "06:00", sort: 600, type: "strength", coach: "Ivy" },
    { time: "07:00", sort: 700, type: "crossfit", coach: "Ivy" },
    { time: "09:30", sort: 930, type: "crossfit", coach: "Marcus" },
    { time: "12:00", sort: 1200, type: "open", coach: "Marcus" },
    { time: "17:30", sort: 1730, type: "crossfit", coach: "Dane", popular: true },
    { time: "18:30", sort: 1830, type: "hyrox", coach: "Dane" },
    { time: "19:30", sort: 1930, type: "onramp", coach: "Rae" },
  ],
  Friday: [
    { time: "06:00", sort: 600, type: "crossfit", coach: "Marcus" },
    { time: "07:00", sort: 700, type: "crossfit", coach: "Marcus" },
    { time: "09:30", sort: 930, type: "strength", coach: "Ivy" },
    { time: "12:00", sort: 1200, type: "crossfit", coach: "Ivy" },
    { time: "17:30", sort: 1730, type: "crossfit", coach: "Rae", popular: true },
    { time: "18:30", sort: 1830, type: "open", coach: "Rae" },
  ],
  Saturday: [
    { time: "08:00", sort: 800, type: "hyrox", coach: "Dane", popular: true },
    { time: "09:00", sort: 900, type: "crossfit", coach: "Marcus", popular: true },
    { time: "10:00", sort: 1000, type: "crossfit", coach: "Marcus" },
    { time: "11:00", sort: 1100, type: "open", coach: "Ivy" },
  ],
  Sunday: [
    { time: "09:00", sort: 900, type: "open", coach: "Rae" },
    { time: "10:00", sort: 1000, type: "crossfit", coach: "Rae" },
  ],
};

export function sessionsFor(day: Day) {
  return [...schedule[day]].sort((a, b) => a.sort - b.sort);
}

export function totalWeeklyClasses() {
  return days.reduce((n, d) => n + schedule[d].length, 0);
}
