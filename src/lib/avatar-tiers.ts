// ---------------------------------------------------------------------------
// Video avatar — one option, one price.
//
// Seven minutes for a fixed amount, bought from the tin on /avatar. No free
// taster and no email tier: the only way in is to pay for a session.
//
// The price is gross and final — no VAT is added or shown, because the
// business runs under the German small-business rule (§ 19 UStG). If that ever
// changes, set VAT_RATE below and the checkout grosses the price up instead of
// silently eating 19% of the margin.
// ---------------------------------------------------------------------------

/** The only session there is. */
export const AVATAR_SESSION = {
  label: "Seven minutes",
  /** Hard cap handed to Tavus as `max_call_duration`. */
  seconds: 420,
  /** Gross price in euro cents. */
  amountCents: 349,
  blurb:
    "Seven minutes with the avatar. Ask about pacing, the roxzone, a station you keep losing time on, or a race you are about to run.",
} as const;

/** Small-business rule: no VAT is charged. Set to e.g. 0.19 if that changes. */
export const VAT_RATE = 0;

export function formatEuro(cents: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}
