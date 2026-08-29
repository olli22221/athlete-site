// ---------------------------------------------------------------------------
// Coach roster. `image` is optional — a styled monogram tile is shown when a
// photo isn't available yet, so the section never looks broken.
// ---------------------------------------------------------------------------

export type Coach = {
  id: string;
  name: string;
  role: string;
  bio: string;
  certs: string[];
  image?: string;
  gradient: [string, string];
};

export const coaches: Coach[] = [
  {
    id: "marcus",
    name: "Marcus Bell",
    role: "Head Coach · Co-founder",
    bio: "Twelve years coaching CrossFit, five of them running competition teams. Marcus writes the strength cycles and still takes the 6am class most mornings.",
    certs: ["CF-L3", "USAW Level 2", "Precision Nutrition L1"],
    gradient: ["#2a2f1e", "#0d0e0f"],
  },
  {
    id: "dane",
    name: "Dane Okoye",
    role: "Hyrox Lead",
    bio: "Sub-65 Hyrox finisher and the person who built our race programming. Dane handles pacing strategy, sled technique, and the running work nobody wants to do.",
    certs: ["Hyrox Certified Trainer", "CF-L2", "UESCA Endurance"],
    gradient: ["#12212b", "#08090a"],
  },
  {
    id: "ivy",
    name: "Ivy Marchetti",
    role: "Strength Coach",
    bio: "Former competitive weightlifter. Ivy runs the barbell cycles and is the coach most likely to tell you to take weight off the bar and fix the movement first.",
    certs: ["CF-L2", "USAW Level 1", "FRCms"],
    gradient: ["#33230f", "#0a0a0a"],
  },
  {
    id: "rae",
    name: "Rae Lindqvist",
    role: "On-Ramp & Community",
    bio: "Rae takes every beginner through their first four sessions. If you've never trained like this before, you'll meet Rae first — and you'll be fine.",
    certs: ["CF-L2", "CrossFit Scaling & Adaptive", "First Aid"],
    gradient: ["#241a12", "#08090a"],
  },
];
