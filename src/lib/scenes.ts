// ---------------------------------------------------------------------------
// The cinematic scroll sequence on the homepage.
//
// Each scene is one full-viewport frame. As the visitor scrolls, scenes
// cross-fade into each other with a slow Ken Burns push, so the page reads
// like a title sequence rather than a slideshow.
//
// IMAGES: 16:9 files in `public/images/scenes/`. Until a file exists, the
// scene falls back to its `gradient` so the section still looks deliberate.
// ---------------------------------------------------------------------------

export type Scene = {
  id: string;
  /** Small overline, e.g. "01 — The Box" */
  kicker: string;
  /** Large display line */
  headline: string;
  /** Supporting line */
  caption: string;
  image: string;
  /** Fallback + underlay tint while the image loads (or if it's missing) */
  gradient: [string, string];
  /** object-position for the image; tune per-scene so mobile crops well */
  focal?: string;
};

export const scenes: Scene[] = [
  {
    id: "box",
    kicker: "01 — The Box",
    headline: "THIS IS THE ROOM",
    caption:
      "Rig, barbells, rubber and chalk. Nothing decorative, nothing you don't need. It opens at 5:45am.",
    image: "/images/scenes/box.webp",
    gradient: ["#2b1a0d", "#0a0a08"],
    focal: "50% 50%",
  },
  {
    id: "sled",
    kicker: "02 — The Sled",
    headline: "HYROX STARTS HERE",
    caption:
      "Sled push, sled pull, and the eight stations after them. We train the race, not just the fitness.",
    image: "/images/scenes/sled.webp",
    gradient: ["#2e1f10", "#090b09"],
    focal: "50% 50%",
  },
  {
    id: "class",
    kicker: "03 — The Class",
    headline: "NOBODY TRAINS ALONE",
    caption:
      "Every session is coached and every movement is scaled. The person next to you started somewhere too.",
    image: "/images/scenes/class.webp",
    gradient: ["#241a12", "#08090a"],
    focal: "50% 50%",
  },
  {
    id: "engine",
    kicker: "04 — The Engine",
    headline: "BUILD THE ENGINE",
    caption:
      "Ergs, running, intervals. The unglamorous work that decides how the last station of a race feels.",
    image: "/images/scenes/engine.webp",
    gradient: ["#12212b", "#0a0a0a"],
    focal: "50% 50%",
  },
  {
    id: "race",
    kicker: "05 — Race Day",
    headline: "THEN YOU FIND OUT",
    caption:
      "118 of our members have crossed a Hyrox finish line. The training is only ever a rehearsal for this.",
    image: "/images/scenes/race.webp",
    gradient: ["#33230f", "#08090a"],
    focal: "50% 50%",
  },
];
