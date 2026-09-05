// ---------------------------------------------------------------------------
// Abuse and cost guards for the video avatar.
//
// Tavus bills per conversation minute, so an unauthenticated endpoint that
// starts sessions is a spending endpoint. Three independent limits sit in
// front of it:
//
//   1. per-IP rate limit      — stops one visitor looping the free tier
//   2. daily free-minute cap  — bounds what the free tiers can cost per day
//   3. daily total-minute cap — an absolute ceiling, paid sessions included
//
// Budget is reserved at the tier's *maximum* duration before the session
// starts, because the real duration is unknowable until the visitor hangs up.
// Reserving the worst case is what makes the ceiling a ceiling.
// ---------------------------------------------------------------------------

import { kvIncrBy } from "./kv";
import type { AvatarTier } from "./avatar-tiers";

const DAY_SECONDS = 24 * 60 * 60;

function envMinutes(name: string, fallback: number): number {
  const parsed = Number(process.env[name]);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

/** Ceiling for the free tiers (teaser + email-gated) per day. */
export const freeMinutesPerDay = () => envMinutes("AVATAR_FREE_MINUTES_PER_DAY", 30);
/** Absolute ceiling across every tier per day. */
export const totalMinutesPerDay = () => envMinutes("AVATAR_TOTAL_MINUTES_PER_DAY", 180);

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export type GuardFailure = {
  status: number;
  error: string;
  message: string;
  retryAfterSeconds?: number;
};

/**
 * Fixed-window limiter. Windows are coarse (a burst can straddle a boundary),
 * which is the accepted trade for a counter that costs one round trip.
 */
async function limit(
  key: string,
  max: number,
  windowSeconds: number
): Promise<boolean> {
  const bucket = Math.floor(Date.now() / 1000 / windowSeconds);
  const count = await kvIncrBy(`rl:${key}:${bucket}`, 1, windowSeconds);
  return count <= max;
}

export async function checkStartRate(
  ip: string,
  walletId: string
): Promise<GuardFailure | null> {
  const perHour = await limit(`ip:${ip}:h`, 6, 60 * 60);
  if (!perHour) {
    return {
      status: 429,
      error: "rate_limited",
      message: "Too many sessions from this connection. Try again in an hour.",
      retryAfterSeconds: 60 * 60,
    };
  }

  const perDay = await limit(`ip:${ip}:d`, 20, DAY_SECONDS);
  if (!perDay) {
    return {
      status: 429,
      error: "rate_limited",
      message: "Daily session limit reached for this connection.",
      retryAfterSeconds: DAY_SECONDS,
    };
  }

  const perWallet = await limit(`wallet:${walletId}:h`, 6, 60 * 60);
  if (!perWallet) {
    return {
      status: 429,
      error: "rate_limited",
      message: "Too many sessions started. Try again in an hour.",
      retryAfterSeconds: 60 * 60,
    };
  }

  return null;
}

/**
 * Reserves this session's worst-case minutes against the daily caps.
 * Returns a failure when a cap would be exceeded — and rolls the counters
 * back so a refused session does not consume budget.
 */
export async function reserveBudget(tier: AvatarTier): Promise<GuardFailure | null> {
  const day = today();
  const isFree = tier.gate !== "credit";

  const total = await kvIncrBy(`budget:total:${day}`, tier.seconds, DAY_SECONDS);
  if (total > totalMinutesPerDay() * 60) {
    await kvIncrBy(`budget:total:${day}`, -tier.seconds);
    return {
      status: 503,
      error: "budget_exhausted",
      message:
        "The avatar is booked out for today. It comes back online tomorrow.",
    };
  }

  if (isFree) {
    const free = await kvIncrBy(`budget:free:${day}`, tier.seconds, DAY_SECONDS);
    if (free > freeMinutesPerDay() * 60) {
      await kvIncrBy(`budget:free:${day}`, -tier.seconds);
      await kvIncrBy(`budget:total:${day}`, -tier.seconds);
      return {
        status: 503,
        error: "free_budget_exhausted",
        message:
          "Today's free minutes are used up. Credits still work, or come back tomorrow.",
      };
    }
  }

  return null;
}

/** Gives budget back when the session could not be created after all. */
export async function releaseBudget(tier: AvatarTier): Promise<void> {
  const day = today();
  await kvIncrBy(`budget:total:${day}`, -tier.seconds);
  if (tier.gate !== "credit") {
    await kvIncrBy(`budget:free:${day}`, -tier.seconds);
  }
}
