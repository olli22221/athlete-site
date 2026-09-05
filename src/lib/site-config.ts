// ---------------------------------------------------------------------------
// Single source of truth for the athlete brand.
//
// Everything a rebrand needs lives here. `isPlaceholder` stays true until the
// real name, times and races are filled in — while it is true the site shows a
// visible placeholder notice, so example figures can never be mistaken for
// real results.
// ---------------------------------------------------------------------------

export const siteConfig = {
  /** Flip to false once the values below are real. */
  isPlaceholder: true,

  /** The season campaign — this is what the site is named after, not the sport.
   *  Deliberately not "Hyrox <something>": HYROX is a registered trademark and
   *  a brand of your own outlives the format. */
  name: "ROAD TO PRO",
  shortName: "RTP",
  season: "26/27",

  athlete: {
    name: "Athlete Name",
    role: "Hybrid racer",
    nationality: "Germany",
    ageGroup: "25–29",
    based: "Germany",
  },

  tagline: "Open to Pro in one season. Every number in public.",

  /** Homepage media. Empty strings fall back to a marked placeholder —
   *  see public/media/README.md. */
  media: {
    heroVideo: "",
    heroPoster: "",
    featureVideo: "",
  },

  intro:
    "One season, one threshold. Every race filmed, every split published — including the ones that did not go to plan.",

  /** The number the whole season is measured against. Check the official
   *  standard for your age group before racing on it. */
  target: {
    seconds: 3600,
    label: "Sub 60:00",
    note: "Pro division entry standard for this age group — verify on hyrox.com before the season.",
  },

  bio: [
    "Placeholder biography. Two or three paragraphs: where you came from athletically, why hybrid racing, and what this season is actually for.",
    "Keep the second paragraph concrete — training volume, the split you are worst at, the thing you changed this year. Specifics are what people remember and what search engines and AI answers can quote.",
    "Close on the season goal and what happens after it, so the page still works once the goal is met or missed.",
  ],

  socials: [
    { name: "Instagram", handle: "@yourhandle", url: "https://instagram.com/", icon: "instagram" as const },
    { name: "YouTube", handle: "@yourhandle", url: "https://youtube.com/", icon: "youtube" as const },
    { name: "TikTok", handle: "@yourhandle", url: "https://tiktok.com/", icon: "tiktok" as const },
  ],

  contactEmail: "hello@example.com",

  nav: [
    { href: "/races", label: "Races" },
    { href: "/about", label: "About" },
    { href: "/avatar", label: "Avatar" },
    { href: "/shop", label: "Shop" },
    { href: "/faq", label: "FAQ" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
