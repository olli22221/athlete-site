# FORGE — CrossFit & Hyrox

A cinematic website for a CrossFit and Hyrox gym, built with Next.js (App
Router), TypeScript, Tailwind CSS and Framer Motion. Includes a class
timetable, membership pricing, coach roster, gym shop, and an AI coach powered
by [Tavus](https://www.tavus.io).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Rebranding it

Almost all copy lives in a handful of data files — you should not need to touch
a component to make this your gym:

| File | Controls |
|---|---|
| `src/lib/site-config.ts` | Gym name, tagline, address, phone, stats, programmes, testimonials, socials |
| `src/lib/schedule.ts` | Class types (with colours) and the full weekly timetable |
| `src/lib/memberships.ts` | Pricing tiers and the free-trial offer |
| `src/lib/coaches.ts` | Coach roster, bios and certifications |
| `src/lib/products.ts` | Shop catalogue |
| `src/lib/scenes.ts` | The homepage scroll sequence |

The gym name appears everywhere via `siteConfig.name` / `siteConfig.fullName`,
so renaming is a one-line change.

Class counts are derived, not hardcoded: the homepage and timetable headline
call `totalWeeklyClasses()`, so adding a session updates the copy automatically.

## Pages

- `/` — hero, cinematic scroll sequence, about, stats, programmes, free-trial
  block, membership, coaches, shop preview, AI coach, testimonials
- `/schedule` — weekly timetable, filterable by day and class type
- `/membership` — pricing tiers, free trial, and FAQs
- `/coaches` — coach roster with credentials
- `/shop`, `/shop/[slug]` — gym merch and Hyrox gear (showcase only, no checkout)
- `/coach-ai` — the Tavus-powered AI coach
- `/contact` — free-class booking enquiry form

## The cinematic scroll sequence

Five full-viewport scenes (the box → sled push → group class → ergs → race day)
cross-fade into one another with a slow Ken Burns push, letterbox bars, and a
progress rail.

- Scene copy, image paths and crop focal points: `src/lib/scenes.ts`
- The scroll rig: `src/components/CinematicScroll.tsx`
- The images: `public/images/scenes/` — see the README there for download and
  WebP conversion instructions

Opacity is driven by explicit scalar functions (`sceneOpacity` / `sceneTravel`)
rather than keyframe arrays, so behaviour at the range edges is unambiguous:
each scene is fully opaque only inside its own window, with a clean 50/50
two-way dissolve at boundaries. It respects `prefers-reduced-motion` — the
push-in and parallax are disabled, the cross-fade remains.

## Wiring up Tavus (AI Coach)

The `/coach-ai` page and its API routes are complete and waiting on credentials:

1. Create a replica at [platform.tavus.io](https://platform.tavus.io).
2. Copy `.env.example` to `.env.local`.
3. Fill in `TAVUS_API_KEY` and `TAVUS_REPLICA_ID` (optionally `TAVUS_PERSONA_ID`).
4. Restart. The "AI Coach coming soon" card flips to a live video conversation
   automatically.

Your API key is read server-side only and never reaches the browser.

Relevant files:

- `src/app/api/tavus/status/route.ts` — reports whether Tavus is configured
- `src/app/api/tavus/create-conversation/route.ts` — starts a Tavus CVI session
- `src/app/api/tavus/end-conversation/route.ts` — ends one early
- `src/components/TavusCoach.tsx` — the widget (handles unconfigured, loading,
  live and error states)

## Known placeholders

These are deliberately fake and should be replaced before launch:

- Gym name, address, phone and email in `src/lib/site-config.ts`
- All member testimonials and coach profiles
- Stats (member counts, Hyrox finishers) in `src/lib/site-config.ts`
- Membership prices in `src/lib/memberships.ts`
- The contact form posts via `mailto:` — swap for Formspree, Resend or your
  gym CRM before taking real bookings
- Scene imagery is AI-generated; real photos of your gym will outperform it

## Build

```bash
npm run build
npm run start
```
