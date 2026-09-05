import { NextResponse } from "next/server";
import {
  AVATAR_TIERS,
  type AvatarTierId,
} from "@/lib/avatar-tiers";
import {
  checkStartRate,
  clientIp,
  releaseBudget,
  reserveBudget,
} from "@/lib/avatar-guard";
import { kvIsDurable } from "@/lib/kv";
import {
  WALLET_COOKIE,
  currentWallet,
  walletCookieOptions,
  writeWallet,
} from "@/lib/wallet";

const TAVUS_API_URL = "https://tavusapi.com/v2/conversations";

// Starts a Tavus conversation, but only after the request has cleared every
// gate: a valid tier, the per-IP and per-wallet rate limits, the daily minute
// budgets, and — for paid sessions — an actual credit balance.
//
// The tier decides `max_call_duration`; it is never taken from the client.
// A caller who could name their own duration could name a very expensive one.

function isTierId(value: unknown): value is AvatarTierId {
  return value === "teaser" || value === "lead" || value === "paid";
}

export async function POST(request: Request) {
  const apiKey = process.env.TAVUS_API_KEY;
  const replicaId = process.env.TAVUS_REPLICA_ID;
  const personaId = process.env.TAVUS_PERSONA_ID;

  if (!apiKey || !replicaId) {
    return NextResponse.json(
      {
        error: "not_configured",
        message:
          "Tavus isn't set up yet. Add TAVUS_API_KEY and TAVUS_REPLICA_ID to your environment (see .env.example).",
      },
      { status: 501 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const requested = (body as { tier?: unknown })?.tier;
  const tierId: AvatarTierId = isTierId(requested) ? requested : "teaser";
  const tier = AVATAR_TIERS[tierId];

  const { wallet, isNew, cookieValue } = await currentWallet();

  // The in-memory KV fallback cannot hold a limit across serverless instances,
  // so refuse to run the gated tiers on it in production rather than pretend
  // the budget cap is real.
  if (!kvIsDurable() && process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error: "storage_unavailable",
        message:
          "The avatar is temporarily unavailable. (No durable store configured — set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.)",
      },
      { status: 503 }
    );
  }

  const rateFailure = await checkStartRate(clientIp(request), wallet.id);
  if (rateFailure) {
    return respond(rateFailure, isNew, cookieValue);
  }

  if (tier.gate === "email" && (wallet.leadUsed || !wallet.email)) {
    return respond(
      {
        status: 403,
        error: "email_required",
        message: wallet.email
          ? "You've already used the free five-minute session."
          : "Leave your email first to unlock the five-minute session.",
      },
      isNew,
      cookieValue
    );
  }

  if (tier.gate === "credit" && wallet.sessions < 1) {
    return respond(
      {
        status: 402,
        error: "no_credit",
        message: "No credits left. Buy a session to keep talking.",
      },
      isNew,
      cookieValue
    );
  }

  const budgetFailure = await reserveBudget(tier);
  if (budgetFailure) {
    return respond(budgetFailure, isNew, cookieValue);
  }

  // Spend the entitlement *before* calling Tavus, so two racing requests
  // cannot both spend the same credit. It is handed back below if Tavus
  // refuses to create the conversation.
  const spent = { credit: false, lead: false };
  if (tier.gate === "credit") {
    wallet.sessions -= 1;
    spent.credit = true;
    await writeWallet(wallet);
  } else if (tier.gate === "email") {
    wallet.leadUsed = true;
    spent.lead = true;
    await writeWallet(wallet);
  }

  async function refund() {
    await releaseBudget(tier);
    if (spent.credit) wallet.sessions += 1;
    if (spent.lead) wallet.leadUsed = false;
    if (spent.credit || spent.lead) await writeWallet(wallet);
  }

  try {
    const response = await fetch(TAVUS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        replica_id: replicaId,
        ...(personaId ? { persona_id: personaId } : {}),
        conversation_name: `${tier.label} session`,
        properties: {
          max_call_duration: tier.seconds,
          enable_recording: false,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      await refund();
      return respond(
        {
          status: response.status,
          error: "tavus_error",
          message: data?.message || "Tavus rejected the request.",
        },
        isNew,
        cookieValue
      );
    }

    const payload = NextResponse.json({
      conversationId: data.conversation_id,
      conversationUrl: data.conversation_url,
      tier: tier.id,
      seconds: tier.seconds,
      sessionsLeft: wallet.sessions,
    });
    if (isNew) payload.cookies.set(WALLET_COOKIE, cookieValue, walletCookieOptions);
    return payload;
  } catch {
    await refund();
    return respond(
      {
        status: 502,
        error: "network_error",
        message: "Couldn't reach Tavus. Try again in a moment.",
      },
      isNew,
      cookieValue
    );
  }
}

function respond(
  failure: { status: number; error: string; message: string; retryAfterSeconds?: number },
  isNew: boolean,
  cookieValue: string
) {
  const response = NextResponse.json(
    { error: failure.error, message: failure.message },
    { status: failure.status }
  );
  if (failure.retryAfterSeconds) {
    response.headers.set("Retry-After", String(failure.retryAfterSeconds));
  }
  if (isNew) response.cookies.set(WALLET_COOKIE, cookieValue, walletCookieOptions);
  return response;
}
