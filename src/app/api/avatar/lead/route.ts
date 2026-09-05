import { NextResponse } from "next/server";
import { checkStartRate, clientIp } from "@/lib/avatar-guard";
import {
  WALLET_COOKIE,
  currentWallet,
  walletCookieOptions,
  writeWallet,
} from "@/lib/wallet";

// Exchanges an email address for the five-minute avatar tier.
//
// This unlocks the session immediately, but it does NOT subscribe anyone to
// anything: under GDPR a newsletter needs a confirmed double opt-in, and that
// confirmation mail belongs to the newsletter provider. What is stored here is
// the address plus whether the visitor ticked the newsletter box, so the
// provider can send the confirmation and own the consent record.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const email = String((body as { email?: unknown })?.email ?? "").trim().toLowerCase();
  const newsletter = Boolean((body as { newsletter?: unknown })?.newsletter);

  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "invalid_email", message: "That doesn't look like an email address." },
      { status: 400 }
    );
  }

  const { wallet, isNew, cookieValue } = await currentWallet();

  const rateFailure = await checkStartRate(clientIp(request), wallet.id);
  if (rateFailure) {
    return NextResponse.json(
      { error: rateFailure.error, message: rateFailure.message },
      { status: rateFailure.status }
    );
  }

  // Re-submitting a different address must not hand out a second free session.
  const alreadyClaimed = Boolean(wallet.email);

  wallet.email = email;
  wallet.emailAt = wallet.emailAt ?? new Date().toISOString();
  wallet.newsletterOptIn = newsletter;
  if (!alreadyClaimed) wallet.leadUsed = false;
  await writeWallet(wallet);

  const response = NextResponse.json({
    ok: true,
    unlocked: !wallet.leadUsed,
    message: wallet.leadUsed
      ? "Email saved. The free session was already used on this device."
      : "Five-minute session unlocked.",
  });
  if (isNew) response.cookies.set(WALLET_COOKIE, cookieValue, walletCookieOptions);
  return response;
}
