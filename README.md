# Personal Brand — Athlete & Performance Coach

A cinematic personal website built with Next.js (App Router), TypeScript,
Tailwind CSS, and Framer Motion. Includes a product showcase (apparel,
weight vests, equipment) and a "Talk to my AI Clone" page wired up for
[Tavus](https://www.tavus.io).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Personalizing the content

Almost everything on the site — name, tagline, bio, stats, services,
testimonials, and social links — comes from a single file:

- `src/lib/site-config.ts`

The product catalog (apparel, weight vests, equipment) lives in:

- `src/lib/products.ts`

Edit these files and the whole site updates. Products currently use
stylized gradient tiles instead of photos — swap in real product photography
by adding an `image` field/`<Image>` usage once you have shots, or drop
files into `public/images/` and reference them.

## The cinematic scroll sequence

The homepage centrepiece is a scroll-pinned title sequence: five full-viewport
scenes (soccer pitch → calisthenics park → gym → hill sprints → Miami
penthouse) that cross-fade into one another with a slow Ken Burns push,
letterbox bars, and a progress rail.

- Scene copy, image paths, and per-scene crop focal points:
  `src/lib/scenes.ts` — add or remove entries and the section resizes itself
- The scroll rig: `src/components/CinematicScroll.tsx`
- The images themselves: `public/images/scenes/` (see the README in that
  folder for download + WebP conversion instructions)

It respects `prefers-reduced-motion` — the push-in and parallax are disabled
for visitors who've asked for reduced motion, while the cross-fade remains.

Images were generated with [Higgsfield](https://higgsfield.ai) using the
`soul_2` model at 2048×1152. A fixed "character bible" and grade string are
repeated verbatim in every prompt, which is what keeps the same person and the
same film look across all five scenes — worth preserving if you regenerate.

## Pages

- `/` — cinematic landing page: hero, scroll sequence, about, stats,
  coaching/services, featured gear, AI clone teaser, testimonials, final CTA
- `/products` — full catalog with category filtering
- `/products/[slug]` — product detail page
- `/clone` — the Tavus-powered "Talk to my AI Clone" experience
- `/contact` — contact form (currently opens the visitor's email client —
  swap the `<form>` action in `src/app/contact/page.tsx` for a real form
  provider like Formspree or Resend when you're ready to collect
  submissions server-side)

## Wiring up Tavus (AI Clone)

The `/clone` page and its API routes are fully built, just waiting on
credentials:

1. Create an account and a **replica** at [platform.tavus.io](https://platform.tavus.io).
2. Copy `.env.example` to `.env.local`.
3. Fill in `TAVUS_API_KEY` and `TAVUS_REPLICA_ID` (and optionally
   `TAVUS_PERSONA_ID` if you've set up a persona).
4. Restart the dev server (or redeploy). The "AI Clone coming soon" card
   on `/clone` will automatically switch to a live "Start Conversation"
   button.

Relevant files:

- `src/app/api/tavus/status/route.ts` — tells the frontend whether Tavus is configured
- `src/app/api/tavus/create-conversation/route.ts` — creates a live Tavus CVI conversation
- `src/app/api/tavus/end-conversation/route.ts` — ends a conversation early
- `src/components/TavusClone.tsx` — the client widget (handles all states: unconfigured, loading, active call, error)

Your `TAVUS_API_KEY` never reaches the browser — it's only read server-side
inside the API routes.

## Store / checkout

The shop is currently a showcase catalog (no payments). Each product page
has a "Notify Me When Available" button that opens an email draft. When
you're ready to sell for real, the most common next step is wiring up
[Stripe Checkout](https://stripe.com/docs/payments/checkout) from the
`ProductPurchasePanel` component.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- Framer Motion (scroll reveals, counters)
- lucide-react (icons)

## Build

```bash
npm run build
npm run start
```
