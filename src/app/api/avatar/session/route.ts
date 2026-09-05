import { NextResponse } from "next/server";
import { AVATAR_SESSION } from "@/lib/avatar-tiers";
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
  walletConfigured,
  writeWallet,
} from "@/lib/wallet";

const TAVUS_API_URL = "https://tavusapi.com/v2/conversations";

// Starts a Tavus conversation. There is one kind of session and it is paid, so
// the only way past this route is a credit in the wallet — plus the rate
// limits and the daily minute budget.
//
// `max_call_duration` is a server-side constant. A caller who could name their
// own duration could name a very expensive one.

export async function POST(request: Request) {
  if (!walletConfigured()) {
    return NextResponse.json(
      {
        error: "not_configured",
        message: "Set APP_SECRET to a random 32+ character value (see .env.example).",
      },
      { status: 501 }
    );
  }

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

  const { wallet, isNew, cookieValue } = await currentWallet();

  // The in-memory KV fallback cannot hold a limit across serverless instances,
  // so refuse rather than pretend the budget cap is real.
  if (!kvIsDurable() && process.env.NODE_ENV === "production") {
    return respond(
      {
        status: 503,
        error: "storage_unavailable",
        message:
          "The avatar is temporarily unavailable. (No durable store configured — set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.)",
      },
      isNew,
      cookieValue
    );
  }

  const rateFailure = await checkStartRate(clientIp(request), wallet.id);
  if (rateFailure) return respond(rateFailure, isNew, cookieValue);

  if (wallet.sessions < 1) {
    return respond(
      {
        status: 402,
        error: "no_credit",
        message: "No session paid for yet. Use the tin to buy one.",
      },
      isNew,
      cookieValue
    );
  }

  const budgetFailure = await reserveBudget(AVATAR_SESSION.seconds);
  if (budgetFailure) return respond(budgetFailure, isNew, cookieValue);

  // Spend the credit *before* calling Tavus, so two racing requests cannot
  // spend the same one. It is handed back below if Tavus refuses.
  wallet.sessions -= 1;
  await writeWallet(wallet);

  async function refund() {
    await releaseBudget(AVATAR_SESSION.seconds);
    wallet.sessions += 1;
    await writeWallet(wallet);
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
        conversation_name: AVATAR_SESSION.label,
        properties: {
          max_call_duration: AVATAR_SESSION.seconds,
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
      seconds: AVATAR_SESSION.seconds,
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
