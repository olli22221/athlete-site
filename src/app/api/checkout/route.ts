import { NextResponse } from "next/server";
import Stripe from "stripe";
import { CREDIT_PACKS, VAT_RATE, findPack } from "@/lib/avatar-tiers";
import { kvIsDurable } from "@/lib/kv";
import {
  WALLET_COOKIE,
  currentWallet,
  walletCookieOptions,
  walletConfigured,
} from "@/lib/wallet";

// Creates a Stripe Checkout session for one credit pack.
//
// The price comes from CREDIT_PACKS on the server — never from the request —
// so a visitor cannot post their own amount and buy eight sessions for a cent.
// The wallet id travels in the session metadata; the webhook is what actually
// grants the credits, because a visitor can close the browser on the success
// page and a payment must still land.

export async function POST(request: Request) {
  if (!walletConfigured()) {
    return NextResponse.json(
      {
        error: "not_configured",
        message:
          "Set APP_SECRET to a random 32+ character value (see .env.example).",
      },
      { status: 501 }
    );
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      {
        error: "not_configured",
        message:
          "Payments aren't set up yet. Add STRIPE_SECRET_KEY to your environment (see .env.example).",
      },
      { status: 501 }
    );
  }

  // Credits granted into a store that forgets them on restart would be sold
  // and then lost. Refuse rather than take the money.
  if (!kvIsDurable()) {
    return NextResponse.json(
      {
        error: "storage_unavailable",
        message:
          "Payments are disabled until a durable store is configured (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN).",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const packId = String((body as { pack?: unknown })?.pack ?? "");
  const pack = findPack(packId);
  if (!pack) {
    return NextResponse.json(
      {
        error: "unknown_pack",
        message: `Unknown pack. Available: ${CREDIT_PACKS.map((p) => p.id).join(", ")}.`,
      },
      { status: 400 }
    );
  }

  const { wallet, isNew, cookieValue } = await currentWallet();
  const stripe = new Stripe(secretKey);
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    request.headers.get("origin") ??
    "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // Small-business rule (§ 19 UStG): the listed price is the final price
      // and no VAT is added. Flip this on together with VAT_RATE if the
      // business leaves that rule.
      automatic_tax: { enabled: VAT_RATE > 0 },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: pack.amountCents,
            product_data: {
              name: `Avatar credits — ${pack.label}`,
              description: `${pack.sessions} × 7 minutes with the video avatar.`,
            },
          },
        },
      ],
      metadata: { walletId: wallet.id, packId: pack.id, sessions: String(pack.sessions) },
      success_url: `${origin}/avatar?purchase=success`,
      cancel_url: `${origin}/avatar?purchase=cancelled`,
    });

    const response = NextResponse.json({ url: session.url });
    if (isNew) response.cookies.set(WALLET_COOKIE, cookieValue, walletCookieOptions);
    return response;
  } catch (error) {
    const message =
      error instanceof Stripe.errors.StripeError
        ? error.message
        : "Couldn't start the checkout.";
    return NextResponse.json({ error: "stripe_error", message }, { status: 502 });
  }
}
