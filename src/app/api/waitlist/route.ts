import { NextResponse } from "next/server";
import { clientIp } from "@/lib/avatar-guard";
import { kvGet, kvIncrBy, kvIsDurable, kvSetIfAbsent } from "@/lib/kv";

// The training-app waitlist.
//
// This is the app's go/no-go signal, not a marketing box: if a few hundred
// people do not sign up over a season, the app is not ready to be built. So
// the count matters, and it is stored rather than forwarded and forgotten.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PLATFORMS = ["ios", "android", "either"] as const;
type Platform = (typeof PLATFORMS)[number];

function isPlatform(value: unknown): value is Platform {
  return typeof value === "string" && (PLATFORMS as readonly string[]).includes(value);
}

export async function GET() {
  const count = Number((await kvGet("waitlist:count")) ?? 0);
  return NextResponse.json({ count, configured: kvIsDurable() });
}

export async function POST(request: Request) {
  if (!kvIsDurable() && process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error: "storage_unavailable",
        message:
          "The waitlist is temporarily unavailable. Try again later, or email me directly.",
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

  const email = String((body as { email?: unknown })?.email ?? "").trim().toLowerCase();
  const rawPlatform = (body as { platform?: unknown })?.platform;
  const platform: Platform = isPlatform(rawPlatform) ? rawPlatform : "either";

  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "invalid_email", message: "That doesn't look like an email address." },
      { status: 400 }
    );
  }

  // Coarse per-IP limit: enough to stop someone inflating the number that the
  // build/don't-build decision rests on.
  const bucket = Math.floor(Date.now() / 1000 / 3600);
  const attempts = await kvIncrBy(`rl:waitlist:${clientIp(request)}:${bucket}`, 1, 3600);
  if (attempts > 5) {
    return NextResponse.json(
      { error: "rate_limited", message: "Too many sign-ups from here. Try again later." },
      { status: 429 }
    );
  }

  // One entry per address, so a double submit does not double the count.
  const isNew = await kvSetIfAbsent(
    `waitlist:${email}`,
    JSON.stringify({ platform, at: new Date().toISOString() })
  );
  if (isNew) await kvIncrBy("waitlist:count", 1);

  return NextResponse.json({
    ok: true,
    alreadyOnList: !isNew,
    message: isNew
      ? "You're on the list. You'll hear when there's something real to try."
      : "You were already on the list — nothing to do.",
  });
}
