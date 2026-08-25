// ---------------------------------------------------------------------------
// The cinematic scroll sequence on the homepage.
//
// Each scene is one full-viewport frame. As the visitor scrolls, scenes
// cross-fade into each other with a slow Ken Burns push, so the page reads
// like a title sequence rather than a slideshow.
//
// IMAGES: drop 16:9 files at the paths below into `public/images/scenes/`.
// Until a file exists, the scene falls back to its `gradient` so the section
// still looks deliberate instead of broken.
// ---------------------------------------------------------------------------

export type Scene = {
  id: string;
  /** Small overline, e.g. "01 — The Pitch" */
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
    id: "pitch",
    kicker: "01 — The Pitch",
    headline: "IT STARTED HERE",
    caption:
      "Before the programming and the podiums, there was just a field and a reason to keep showing up.",
    image: "/images/scenes/pitch.webp",
    gradient: ["#2b1a0d", "#0a0a08"],
    focal: "50% 55%",
  },
  {
    id: "park",
    kicker: "02 — The Park",
    headline: "OWN YOUR BODYWEIGHT",
    caption:
      "No machines, no excuses. Control what you can move before you add load to it.",
    image: "/images/scenes/park.webp",
    gradient: ["#2e1f10", "#090b09"],
    focal: "50% 45%",
  },
  {
    id: "gym",
    kicker: "03 — The Iron",
    headline: "EARNED IN THE DARK",
    caption:
      "The unglamorous middle. Same lifts, same hours, weeks on end — this is where it's actually built.",
    image: "/images/scenes/gym.webp",
    gradient: ["#241a12", "#08090a"],
    focal: "50% 50%",
  },
  {
    id: "hill",
    kicker: "04 — The Hill",
    headline: "NO SHORTCUTS UP",
    caption:
      "Conditioning doesn't negotiate. The hill gives you exactly what you put into it.",
    image: "/images/scenes/hill.webp",
    gradient: ["#33230f", "#0a0a0a"],
    focal: "50% 50%",
  },
  {
    id: "miami",
    kicker: "05 — The View",
    headline: "THEN THE PAYOFF",
    caption:
      "Discipline compounds. Everything on the other side of it is just interest earned.",
    image: "/images/scenes/miami.webp",
    gradient: ["#12212b", "#08090a"],
    focal: "50% 50%",
  },
];
