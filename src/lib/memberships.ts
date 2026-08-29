// ---------------------------------------------------------------------------
// Membership tiers. Prices are monthly unless `unit` says otherwise.
// ---------------------------------------------------------------------------

export type Plan = {
  id: string;
  name: string;
  price: number;
  unit: string;
  tagline: string;
  features: string[];
  /** Renders the highlighted "most popular" treatment */
  featured?: boolean;
  cta: string;
};

export const plans: Plan[] = [
  {
    id: "dropin",
    name: "Drop-In",
    price: 18,
    unit: "per class",
    tagline: "Visiting, or testing the water.",
    features: [
      "Any single class",
      "Full coaching, no commitment",
      "Kit and chalk provided",
      "Perfect for travelling athletes",
    ],
    cta: "Book a class",
  },
  {
    id: "three",
    name: "3x Per Week",
    price: 79,
    unit: "per month",
    tagline: "The consistent middle ground.",
    features: [
      "12 classes per month",
      "CrossFit, Hyrox and Strength",
      "Free Open Gym access",
      "Rolling monthly — cancel anytime",
    ],
    cta: "Get started",
  },
  {
    id: "unlimited",
    name: "Unlimited",
    price: 109,
    unit: "per month",
    tagline: "Train as often as you recover.",
    features: [
      "Unlimited classes",
      "All class types included",
      "Free Open Gym access",
      "Priority booking on popular slots",
      "10% off gym merch and gear",
    ],
    featured: true,
    cta: "Join FORGE",
  },
  {
    id: "hyrox",
    name: "Hyrox Race Team",
    price: 139,
    unit: "per month",
    tagline: "For athletes with a race on the calendar.",
    features: [
      "Everything in Unlimited",
      "Dedicated race-block programming",
      "Monthly time trial and benchmarking",
      "1:1 pacing and strategy review",
      "Team entry support for race weekends",
    ],
    cta: "Apply now",
  },
];

export const trialOffer = {
  heading: "Your first class is free.",
  body: "Come in, meet a coach, and try a real session — scaled to whatever level you're at right now. No card, no contract, no pressure to sign anything on the day.",
  bullets: [
    "No experience needed — we scale everything",
    "Arrive 15 minutes early to meet your coach",
    "Bring trainers and a water bottle, that's it",
  ],
  cta: "Claim your free class",
};
