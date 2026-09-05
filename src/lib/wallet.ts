// ---------------------------------------------------------------------------
// Visitor wallets for the video avatar.
//
// There is no login on this site, so a wallet is identified by a random id
// held in an httpOnly cookie and signed with APP_SECRET. The signature is what
// stops a visitor from typing someone else's wallet id (or a guessed one) into
// their own cookie jar and spending credits they never bought.
//
// Balances themselves live in the KV store, never in the cookie — a cookie the
// client can replay is not a place to keep a number that costs money.
// ---------------------------------------------------------------------------

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { kvGet, kvSet } from "./kv";

export const WALLET_COOKIE = "avatar_wallet";
const WALLET_TTL_DAYS = 365;

export type Wallet = {
  id: string;
  /** Paid sessions left to spend. */
  sessions: number;
  /** The one free email-gated session is available until this flips. */
  leadUsed: boolean;
  email?: string;
  emailAt?: string;
  /** Ticked the newsletter box — the provider still has to confirm it. */
  newsletterOptIn?: boolean;
  createdAt: string;
};

function secret(): string {
  const value = process.env.APP_SECRET;
  if (!value || value.length < 16) {
    throw new Error(
      "APP_SECRET is missing or too short — set a random 32+ character value (see .env.example)."
    );
  }
  return value;
}

function sign(id: string): string {
  return createHmac("sha256", secret()).update(id).digest("base64url");
}

function encode(id: string): string {
  return `${id}.${sign(id)}`;
}

/** Returns the wallet id if the cookie carries a signature we produced. */
function decode(token: string | undefined): string | null {
  if (!token) return null;
  const separator = token.lastIndexOf(".");
  if (separator <= 0) return null;

  const id = token.slice(0, separator);
  const provided = Buffer.from(token.slice(separator + 1));
  const expected = Buffer.from(sign(id));

  if (provided.length !== expected.length) return null;
  return timingSafeEqual(provided, expected) ? id : null;
}

function key(id: string): string {
  return `wallet:${id}`;
}

export async function readWallet(id: string): Promise<Wallet> {
  const raw = await kvGet(key(id));
  if (!raw) {
    return { id, sessions: 0, leadUsed: false, createdAt: new Date().toISOString() };
  }
  try {
    return { ...(JSON.parse(raw) as Wallet), id };
  } catch {
    return { id, sessions: 0, leadUsed: false, createdAt: new Date().toISOString() };
  }
}

export async function writeWallet(wallet: Wallet): Promise<void> {
  await kvSet(key(wallet.id), JSON.stringify(wallet), WALLET_TTL_DAYS * 24 * 60 * 60);
}

/**
 * Reads the wallet named by the request cookie, minting a new id when there
 * is none or the signature does not check out. `isNew` tells the caller it
 * still has to send the cookie back.
 */
export async function currentWallet(): Promise<{
  wallet: Wallet;
  isNew: boolean;
  cookieValue: string;
}> {
  const store = await cookies();
  const existing = decode(store.get(WALLET_COOKIE)?.value);
  const id = existing ?? randomBytes(16).toString("hex");

  return {
    wallet: await readWallet(id),
    isNew: existing === null,
    cookieValue: encode(id),
  };
}

export const walletCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: WALLET_TTL_DAYS * 24 * 60 * 60,
};

/** Credits bought through Stripe. Called from the webhook only. */
export async function grantSessions(id: string, sessions: number): Promise<Wallet> {
  const wallet = await readWallet(id);
  wallet.sessions += sessions;
  await writeWallet(wallet);
  return wallet;
}
