import { NextResponse } from "next/server";
import {
  WALLET_COOKIE,
  currentWallet,
  walletCookieOptions,
  walletConfigured,
} from "@/lib/wallet";

// All the avatar page needs: how many paid sessions are left. The wallet id
// is never returned — the page does not need it, and not sending it keeps it
// out of the browser.

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

  const response = NextResponse.json({ sessionsLeft: wallet.sessions });
  if (isNew) response.cookies.set(WALLET_COOKIE, cookieValue, walletCookieOptions);
  return response;
}
