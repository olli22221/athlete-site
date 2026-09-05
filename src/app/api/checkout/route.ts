import { NextResponse } from "next/server";
import Stripe from "stripe";
import { AVATAR_SESSION, VAT_RATE } from "@/lib/avatar-tiers";
import { kvIsDurable } from "@/lib/kv";
import { siteUrl } from "@/lib/site-url";
import {
  WALLET_COOKIE,
  currentWallet,
  walletCookieOptions,
  walletConfigured,
} from "@/lib/wallet";

// Creates a Stripe Checkout session for one avatar session — what the tin on
// /avatar does when you click it.
//
// The amount comes from AVATAR_SESSION on the server and the request body is
// not read at all, so there is nothing a visitor could post to change what
// they pay. The wallet id travels in the session metadata; the webhook is what
// actually grants the credit, because a visitor can close the browser on the
// success page and the payment must still land.

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

  const { wallet, isNew, cookieValue } = await currentWallet();
  const stripe = new Stripe(secretKey);
  // The request's own origin is the most correct redirect target when it is
  // available; the configured site URL is the fallback for calls without one.
  const origin = request.headers.get("origin")?.trim() || siteUrl();

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
            unit_amount: AVATAR_SESSION.amountCents,
            product_data: {
              name: "Video avatar session",
              description: `${AVATAR_SESSION.seconds / 60} minutes with the video avatar.`,
            },
          },
        },
      ],
      metadata: { walletId: wallet.id, sessions: "1" },
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
