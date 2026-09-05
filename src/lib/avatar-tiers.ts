// ---------------------------------------------------------------------------
// Video avatar — access tiers and credit packs.
//
// Three tiers, deliberately: a free teaser proves the thing works, an
// email-gated session turns curiosity into a lead, and paid credits cover the
// per-minute cost of anyone who wants a real conversation. A pure paywall
// would generate revenue but no leads, which is the wrong trade at this size.
//
// Prices are gross and final — no VAT is added or shown, because the business
// runs under the German small-business rule (§ 19 UStG). If that ever changes,
// set VAT_RATE below and the checkout will gross the prices up instead of
// silently eating 19% of the margin.
// ---------------------------------------------------------------------------

export type AvatarTierId = "teaser" | "lead" | "paid";

export type AvatarTier = {
  id: AvatarTierId;
  label: string;
  /** Hard cap handed to Tavus as `max_call_duration`. */
  seconds: number;
  /** What the visitor has to give up to start this tier. */
  gate: "none" | "email" | "credit";
  blurb: string;
};

export const AVATAR_TIERS: Record<AvatarTierId, AvatarTier> = {
  teaser: {
    id: "teaser",
    label: "Teaser",
    seconds: 60,
    gate: "none",
    blurb: "One minute, no sign-up. Enough to see that it is really me.",
  },
  lead: {
    id: "lead",
    label: "Five minutes",
    seconds: 300,
    gate: "email",
    blurb: "Five minutes in exchange for your email. Once per visitor.",
  },
  paid: {
    id: "paid",
    label: "Full session",
    seconds: 420,
    gate: "credit",
    blurb: "Seven minutes, one credit. Ask about training, pacing, or racing.",
  },
};

// --- credit packs ----------------------------------------------------------
// One credit buys one `paid` session (7 minutes). Packs exist because Stripe's
// fixed per-transaction fee (~0.25 €) is 7% of a single 3.49 € sale but under
// 3% of a pack — the cheapest margin improvement available here.

export type CreditPack = {
  id: string;
  label: string;
  sessions: number;
  /** Gross price in euro cents. */
  amountCents: number;
  highlight?: boolean;
};

export const CREDIT_PACKS: CreditPack[] = [
  { id: "single", label: "1 session", sessions: 1, amountCents: 349 },
  { id: "triple", label: "3 sessions", sessions: 3, amountCents: 949, highlight: true },
  { id: "eight", label: "8 sessions", sessions: 8, amountCents: 2390 },
];

/** Small-business rule: no VAT is charged. Set to e.g. 0.19 if that changes. */
export const VAT_RATE = 0;

export function findPack(id: string): CreditPack | undefined {
  return CREDIT_PACKS.find((p) => p.id === id);
}

export function formatEuro(cents: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

/** Per-session price of a pack, used to show the saving. */
export function unitPriceCents(pack: CreditPack): number {
  return Math.round(pack.amountCents / pack.sessions);
}
