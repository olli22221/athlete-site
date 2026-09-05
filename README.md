# ROAD TO PRO — athlete site

A season-long athlete brand site built around one HYROX campaign: race Open,
get under the Pro qualifying standard, race Pro. Next.js (App Router),
TypeScript, Tailwind CSS 4, Framer Motion.

The commercial part is a paid video avatar: one option, seven minutes, bought
from a tin on the page — with the cost controls that a per-minute API needs.

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
- **The homepage is an opener, not a dashboard.** The athlete, the footage,
  the next race and the avatar — every number lives on `/races`. Footage goes
  in `public/media/` (see the README there); until it exists the hero shows a
  marked placeholder frame rather than a broken video.
- **The splitboard** (`src/components/Splitboard.tsx`), on `/races`, draws a
  race as its sixteen segments in running order. Bar height is the split,
  colour is the change against the previous race, runs are outlined and
  stations filled.
- **App badges** (`src/components/AppBadges.tsx`) sit top-right on every page.
  They are drawn in the site's own system and link to `/app` until the app is
  listed — the official badge artwork is licensed only for listed apps.

## Pages

- `/` — the athlete: full-screen footage, next race, avatar, app badges; a scroll feature below
- `/races` — calendar and full split history, with `SportsEvent` markup
- `/about` — biography and profile, with `Person` markup
- `/avatar` — the video avatar and the tin that pays for it
- `/app` — placeholder for the training-plan app, with the waitlist
- `/shop`, `/shop/[slug]` — preview only, no checkout
- `/faq` — the answer-engine surface, with `FAQPage` markup
- `/contact` — sponsorship and press
- `/impressum`, `/datenschutz` — **not filled in; both block go-live**
- `/llms.txt`, `/sitemap.xml`, `/robots.txt` — generated from the same data

## The video avatar

One option, defined in `src/lib/avatar-tiers.ts`: **seven minutes for a fixed
price**, paid by card before the session starts. No free taster, no email tier.
The price is final — no VAT is added, per the German small-business rule
(§ 19 UStG). To leave that rule, set `VAT_RATE` and `automatic_tax` follows.

The tin (`src/components/DonationTin.tsx`) is the only control: click it, pay
through Stripe, come back with a session waiting. The same button then starts
the conversation.

The amount lives on the server and the checkout route does not read the request
body at all, so there is nothing a visitor could post to change what they pay.

### Cost controls

A public endpoint that starts per-minute video sessions is a spending endpoint.
Four things sit in front of it:

1. **Server-side duration.** `max_call_duration` is a constant and is never
   read from the request.
2. **Rate limits** per IP and per wallet (`src/lib/avatar-guard.ts`).
3. **A daily minute budget** — an absolute ceiling on what a day can cost.
   Sessions are reserved at their *maximum* length, because the real duration
   is unknown until the visitor hangs up.
4. **A durable store requirement.** Without Upstash Redis the app falls back to
   an in-process map, which cannot hold a limit across instances — so payments
   are refused entirely and sessions are refused in production.

The credit is spent *before* Tavus is called, so two racing requests cannot
spend the same one, and it is handed back if Tavus refuses.

### Wallets

There is no login. A wallet is a random id in an httpOnly cookie signed with
`APP_SECRET`; the balance lives in the KV store, never in the cookie. Sessions
are granted by the Stripe webhook — not by the success page — because a visitor
can close the browser and the payment still has to land. Webhook events are
idempotent, since Stripe retries.

## API

| Route | Purpose |
|---|---|
| `POST /api/avatar/session` | Start a session — runs every gate |
| `GET /api/avatar/wallet` | Credits left, lead availability |
| `GET /api/avatar/status` | Which integrations are configured |
| `POST /api/avatar/end` | End a conversation early |
| `POST /api/checkout` | Create a Stripe Checkout session for one session |
| `POST /api/stripe/webhook` | Grant the session on payment |
| `GET`/`POST /api/waitlist` | Training-app waitlist and its count |


## Deploying to Vercel

The app builds and runs with **no environment variables at all** — every
integration degrades to a setup notice instead of failing, so a first deploy is
safe to look at before any keys exist.

1. Push this repository to GitHub.
2. In Vercel, **Add New → Project**, import the repository. Framework detection
   picks up Next.js; the defaults are correct, nothing to change.
3. Deploy. The site comes up with the placeholder data and setup notices.

### Environment variables

Add these in **Settings → Environment Variables** as you wire each part up.
Nothing is needed for a first look.

| Variable | Needed for | Notes |
|---|---|---|
| `APP_SECRET` | The avatar at all | Random 32+ chars: `openssl rand -base64 32` |
| `NEXT_PUBLIC_SITE_URL` | Metadata, sitemap, Stripe redirects | Your real domain, e.g. `https://example.com` |
| `TAVUS_API_KEY`, `TAVUS_REPLICA_ID` | Starting sessions | `TAVUS_PERSONA_ID` optional |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Sessions, rate limits, budgets, waitlist | Vercel Marketplace → Upstash creates both |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Selling sessions | Webhook points at `/api/stripe/webhook` |
| `AVATAR_TOTAL_MINUTES_PER_DAY` | Cost ceiling | Default 180 |

Two of these are refused rather than fudged, on purpose: without a durable KV
store the app will not sell credits, and without `APP_SECRET` it will not mint
a wallet. Both would otherwise fail quietly and cost money.

### Stripe webhook

After the first deploy, add a webhook endpoint in Stripe pointing at
`https://<your-domain>/api/stripe/webhook`, subscribed to
`checkout.session.completed`, and put its signing secret in
`STRIPE_WEBHOOK_SECRET`. Sessions are granted by this webhook, not by the
success page — without it, payments land and sessions do not.

## Before going live

- [ ] Fill in `/impressum` and `/datenschutz` — both are placeholders
- [ ] Confirm the Pro qualifying time for your actual age group on hyrox.com
- [ ] Set `APP_SECRET`, Upstash and Stripe keys in production
- [ ] Point a Stripe webhook at `/api/stripe/webhook`
- [ ] Check Tavus per-minute pricing against `AVATAR_SESSION.amountCents` — the
      margin assumption is that most sessions end well before 7 minutes
- [ ] Set `siteConfig.isPlaceholder = false`

HYROX is a registered trademark of its owner. This is an independent athlete
site with no affiliation to the event organiser — which is also why the brand
name deliberately avoids it.
