// ---------------------------------------------------------------------------
// Single source of truth for the personal brand content.
// Edit the values below to personalize the site — nothing else needs to change.
// ---------------------------------------------------------------------------

export const siteConfig = {
  name: "Jordan Blake",
  shortName: "JB",
  role: "Athlete · Performance Coach",
  tagline: "BUILT IN THE DARK. PROVEN IN THE LIGHT.",
  heroSubtitle:
    "Professional athlete turned performance coach. I help driven people train like competitors — in the gym, on the field, and in life.",
  location: "Los Angeles, CA",

  bio: {
    heading: "Not just a coach. A competitor.",
    paragraphs: [
      "I spent a decade competing at the highest level before I ever coached a single client. That's the difference — every program I write has been stress-tested on my own body, under real pressure, on real competition days.",
      "Today I split my time between training my own body, coaching a small roster of athletes and everyday people who want to move like one, and building tools — like the AI clone on this site — that make elite coaching accessible to anyone, anywhere, any time.",
      "No fluff, no fads. Just programming that's earned its place through years of trial, failure, and podiums.",
    ],
  },

  stats: [
    { label: "Years Competing", value: 11, suffix: "+" },
    { label: "Athletes Coached", value: 480, suffix: "+" },
    { label: "Podium Finishes", value: 27, suffix: "" },
    { label: "Countries Trained In", value: 14, suffix: "" },
  ],

  services: [
    {
      title: "1:1 Coaching",
      description:
        "Fully customized programming, weekly check-ins, and direct access — built around your goals, your schedule, your body.",
      icon: "Target",
    },
    {
      title: "Online Programming",
      description:
        "Structured strength & conditioning plans delivered app-side. Train on your own time with a system that adapts as you progress.",
      icon: "LineChart",
    },
    {
      title: "Performance Camps",
      description:
        "Small-group, high-intensity training blocks for athletes who want to peak for a season, a combine, or a competition.",
      icon: "Flame",
    },
    {
      title: "Nutrition Systems",
      description:
        "No crash diets. Sustainable fueling strategies built around performance, recovery, and how your body actually responds.",
      icon: "Salad",
    },
  ],

  testimonials: [
    {
      quote:
        "Jordan doesn't coach like someone who read about training. Every session feels like it's coming from someone who's actually been there.",
      name: "Marcus T.",
      role: "Amateur MMA Competitor",
    },
    {
      quote:
        "Twelve weeks in and I moved better than I had in a decade. The programming is brutal in the best way.",
      name: "Sara K.",
      role: "Online Coaching Client",
    },
    {
      quote:
        "The AI clone alone answered more of my form questions at 11pm than any app I've paid for.",
      name: "Devon R.",
      role: "Performance Camp Alum",
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
