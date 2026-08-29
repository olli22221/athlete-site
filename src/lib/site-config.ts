// ---------------------------------------------------------------------------
// Single source of truth for the gym's brand + copy.
// Change the values below to rebrand the whole site — nothing else to touch.
// ---------------------------------------------------------------------------

export const siteConfig = {
  name: "FORGE",
  shortName: "FG",
  fullName: "FORGE — CrossFit & Hyrox",
  role: "CrossFit · Hyrox · Strength",
  tagline: "BUILT BY WORK. NOT BY WORDS.",
  heroSubtitle:
    "A CrossFit and Hyrox gym for people who want to be measurably fitter. Coached classes, real programming, and a room full of people who show up.",

  address: {
    line1: "Unit 7, Kingsway Industrial Estate",
    line2: "Manchester M11 4DF",
    maps: "https://maps.google.com/",
  },
  phone: "+44 161 000 0000",

  bio: {
    heading: "Two disciplines. One engine.",
    paragraphs: [
      "FORGE is built around two things that work: CrossFit for broad, general strength and skill, and Hyrox for the engine that carries it. Most gyms pick one. We coach both, and we program them so they feed each other instead of fighting.",
      "Every class is coached start to finish — warm-up, skill, workout, cool-down. Every movement is scaled to the person in front of us, whether that's a first-timer who's never held a barbell or an athlete chasing a sub-70 Hyrox.",
      "No mirrors, no posing, no contracts you can't leave. Just a well-run room, honest programming, and a standard everyone is held to.",
    ],
  },

  stats: [
    { label: "Active Members", value: 340, suffix: "+" },
    { label: "Classes Per Week", value: 62, suffix: "" },
    { label: "Certified Coaches", value: 9, suffix: "" },
    { label: "Hyrox Finishers", value: 118, suffix: "" },
  ],

  // Program pillars shown on the homepage
  programs: [
    {
      title: "CrossFit Classes",
      description:
        "Constantly varied, coached, and scaled to you. Strength, gymnastics, and conditioning in a 60-minute class.",
      icon: "Dumbbell",
    },
    {
      title: "Hyrox Training",
      description:
        "Race-specific work: sled push and pull, burpee broad jumps, wall balls, and the running that ties it together.",
      icon: "Timer",
    },
    {
      title: "Strength & Barbell",
      description:
        "Dedicated lifting blocks. Squat, press, pull, and Olympic lifts on a progressive cycle with real coaching.",
      icon: "Trophy",
    },
    {
      title: "On-Ramp for Beginners",
      description:
        "Never trained like this before? A four-session intro that teaches the movements before you join a class.",
      icon: "Sparkles",
    },
  ],

  testimonials: [
    {
      quote:
        "I'd never touched a barbell. Six months later I finished my first Hyrox. The on-ramp made the difference — I never once felt like the person holding the class up.",
      name: "Priya S.",
      role: "Member, 1 year",
    },
    {
      quote:
        "The coaching is the product. They scale everything properly, and they actually correct you instead of just counting reps.",
      name: "Tom H.",
      role: "Member, 3 years",
    },
    {
      quote:
        "I came from a globo gym where nobody knew my name. Here I get texts if I miss a week. That's why I still turn up at 6am.",
      name: "Daniela K.",
      role: "Member, 2 years",
    },
  ],

  social: {
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
    tiktok: "https://tiktok.com/",
    email: "hello@example.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
