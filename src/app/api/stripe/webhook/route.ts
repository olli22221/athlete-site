import { NextResponse } from "next/server";
import Stripe from "stripe";
import { kvSetIfAbsent } from "@/lib/kv";
import { grantSessions } from "@/lib/wallet";

// Grants avatar credits once Stripe confirms a payment.
//
// Two things make this safe to expose: the signature check, which is the only
// reason to trust that the body came from Stripe at all, and the idempotency
// key, because Stripe retries deliveries and a replayed event must not hand
// out a second pack.

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    return NextResponse.json(
      { error: "not_configured", message: "Stripe webhook is not configured." },
      { status: 501 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  // The signature is computed over the exact bytes Stripe sent, so the body
  // has to be read raw — parsing it first would invalidate the check.
  const payload = await request.text();
  const stripe = new Stripe(secretKey);

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(payload, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status !== "paid") {
    return NextResponse.json({ received: true });
  }

  const walletId = session.metadata?.walletId;
  const sessions = Number(session.metadata?.sessions);

  if (!walletId || !Number.isInteger(sessions) || sessions < 1) {
    // Nothing to credit, but returning 200 stops Stripe retrying forever.
    return NextResponse.json({ received: true, credited: false });
  }

  const first = await kvSetIfAbsent(`stripe:event:${event.id}`, "1", 30 * 24 * 60 * 60);
  if (!first) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  await grantSessions(walletId, sessions);
  return NextResponse.json({ received: true, credited: true });
}
