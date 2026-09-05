# ROAD TO PRO — athlete site

A season-long athlete brand site built around one HYROX campaign: race Open,
get under the Pro qualifying standard, race Pro. Next.js (App Router),
TypeScript, Tailwind CSS 4, Framer Motion.

The commercial part is a three-tier video avatar: a free taster, an
email-gated session, and paid credits — with the cost controls that a
per-minute API needs.

```bash
npm install
cp .env.example .env.local   # fill in what you need
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Nothing here requires a
key to run: every integration degrades to a setup notice instead of failing.

## Making it yours

Almost all content lives in four files:

| File | Controls |
|---|---|
| `src/lib/site-config.ts` | Name, athlete details, target time, bio, socials, navigation |
| `src/lib/races.ts` | The race calendar, results and every split |
| `src/lib/faq.ts` | FAQ entries (these also become the `FAQPage` markup) |
| `src/lib/products.ts` | Shop catalogue |

`siteConfig.isPlaceholder` starts as `true`, which puts a visible notice on
every page saying the data is an example. Set it to `false` once the real
values are in — example race times that look real are worse than none.

## The design: "Splitboard"

The site behaves like a race timing board rather than a fitness landing page.

- **Two themes, not one inverted palette.** Light is a printed results sheet,
  dark is an LED board. Both are defined as tokens in `src/app/globals.css`.
- **Ultramarine is the signature.** Green and red are never decoration — they
  only ever encode pace against target, so a colour always means something.
- **Wide display type, not condensed.** Sports brands reach for narrow faces by
  reflex; the board in the hall is wide. Archivo is loaded with its `wdth` axis
  and set at 112.
- **The telemetry bar** (`src/components/TelemetryBar.tsx`) rides above every
  page with the same four numbers: season, next race, best time, gap to the
  standard.
- **The splitboard** (`src/components/Splitboard.tsx`) draws a race as its
  sixteen segments in running order. Bar height is the split, colour is the
  change against the previous race, runs are outlined and stations filled.

## Pages

- `/` — season state, latest race as a splitboard, the format, next races
- `/races` — calendar and full split history, with `SportsEvent` markup
- `/about` — biography and profile, with `Person` markup
- `/avatar` — the video avatar and its three tiers
- `/shop`, `/shop/[slug]` — preview only, no checkout
- `/faq` — the answer-engine surface, with `FAQPage` markup
- `/contact` — sponsorship and press
- `/impressum`, `/datenschutz` — **not filled in; both block go-live**
- `/llms.txt`, `/sitemap.xml`, `/robots.txt` — generated from the same data

## The video avatar

Three tiers, defined in `src/lib/avatar-tiers.ts`:

| Tier | Gate | Length | Why |
|---|---|---|---|
| Teaser | none | 60 s | Proof it works |
| Lead | email | 5 min | The actual point — an address is worth more than a small sale |
| Paid | credit | 7 min | Covers the per-minute cost |

Credits are sold in packs (`CREDIT_PACKS`) because Stripe's fixed fee is ~7% of
a single €3.49 sale but under 3% of a pack. Prices are final — no VAT is added,
per the German small-business rule (§ 19 UStG). To leave that rule, set
`VAT_RATE` and `automatic_tax` follows.

### Cost controls

A public endpoint that starts per-minute video sessions is a spending endpoint.
Four things sit in front of it:

1. **Tier-bound duration.** `max_call_duration` comes from the tier on the
   server and is never read from the request.
2. **Rate limits** per IP and per wallet (`src/lib/avatar-guard.ts`).
3. **Daily minute budgets** — one for the free tiers, one absolute ceiling.
   Sessions are reserved at their *maximum* length, because the real duration
   is unknown until the visitor hangs up.
4. **A durable store requirement.** Without Upstash Redis the app falls back to
   an in-process map, which cannot hold a limit across instances — so payments
   are refused entirely and gated sessions are refused in production.

Entitlements are spent *before* Tavus is called, so two racing requests cannot
spend the same credit, and are handed back if Tavus refuses.

### Wallets

There is no login. A wallet is a random id in an httpOnly cookie signed with
`APP_SECRET`; balances live in the KV store, never in the cookie. Credits are
granted by the Stripe webhook — not by the success page — because a visitor can
close the browser and the payment still has to land. Webhook events are
idempotent, since Stripe retries.

## API

| Route | Purpose |
|---|---|
| `POST /api/avatar/session` | Start a session — runs every gate |
| `POST /api/avatar/lead` | Exchange an email for the 5-minute tier |
| `GET /api/avatar/wallet` | Credits left, lead availability |
| `GET /api/avatar/status` | Which integrations are configured |
| `POST /api/avatar/end` | End a conversation early |
| `POST /api/checkout` | Create a Stripe Checkout session |
| `POST /api/stripe/webhook` | Grant credits on payment |

## Before going live

- [ ] Fill in `/impressum` and `/datenschutz` — both are placeholders
- [ ] Confirm the Pro qualifying time for your actual age group on hyrox.com
- [ ] Set `APP_SECRET`, Upstash and Stripe keys in production
- [ ] Point a Stripe webhook at `/api/stripe/webhook`
- [ ] Check Tavus per-minute pricing against `CREDIT_PACKS` — the margin
      assumption is that most sessions end well before 7 minutes
- [ ] Set `siteConfig.isPlaceholder = false`
- [ ] Newsletter double opt-in through a provider, if the box is used

HYROX is a registered trademark of its owner. This is an independent athlete
site with no affiliation to the event organiser — which is also why the brand
name deliberately avoids it.
