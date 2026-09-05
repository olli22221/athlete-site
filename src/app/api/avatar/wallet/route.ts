import { NextResponse } from "next/server";
import {
  WALLET_COOKIE,
  currentWallet,
  walletCookieOptions,
  walletConfigured,
} from "@/lib/wallet";

// What the avatar page needs to render the right buttons: how many paid
// sessions are left, and whether the one free email-gated session is still
// available. No wallet id and no email are returned — the page never needs
// them, and not sending them keeps them out of the browser.

export async function GET() {
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

  const { wallet, isNew, cookieValue } = await currentWallet();

  const response = NextResponse.json({
    sessionsLeft: wallet.sessions,
    leadAvailable: Boolean(wallet.email) && !wallet.leadUsed,
    emailKnown: Boolean(wallet.email),
  });
  if (isNew) response.cookies.set(WALLET_COOKIE, cookieValue, walletCookieOptions);
  return response;
}
