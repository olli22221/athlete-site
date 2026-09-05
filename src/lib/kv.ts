// ---------------------------------------------------------------------------
// Tiny key/value store used for avatar credits, rate limits and the daily
// spend cap. Backed by Upstash Redis over its REST API when configured;
// otherwise it falls back to an in-process map so `next dev` works with no
// external service.
//
// The fallback is per-process and disappears on restart, which is fine for
// development and NOT fine in production: several serverless instances would
// each keep their own counters, so the rate limits and the budget cap would
// not actually hold. `kvIsDurable()` reports which mode is active and the
// avatar route refuses to sell credits without a durable store.
// ---------------------------------------------------------------------------

const REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export function kvIsDurable(): boolean {
  return Boolean(REST_URL && REST_TOKEN);
}

type MemoryEntry = { value: string; expiresAt: number | null };
const memory = new Map<string, MemoryEntry>();

function memoryGet(key: string): string | null {
  const entry = memory.get(key);
  if (!entry) return null;
  if (entry.expiresAt !== null && entry.expiresAt <= Date.now()) {
    memory.delete(key);
    return null;
  }
  return entry.value;
}

async function command<T>(args: (string | number)[]): Promise<T> {
  if (!REST_URL || !REST_TOKEN) throw new Error("kv: no remote configured");

  const response = await fetch(REST_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args.map(String)),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`kv: upstash responded ${response.status}`);
  }

  const payload = (await response.json()) as { result: T; error?: string };
  if (payload.error) throw new Error(`kv: ${payload.error}`);
  return payload.result;
}

export async function kvGet(key: string): Promise<string | null> {
  if (!kvIsDurable()) return memoryGet(key);
  return command<string | null>(["GET", key]);
}

export async function kvSet(
  key: string,
  value: string,
  ttlSeconds?: number
): Promise<void> {
  if (!kvIsDurable()) {
    memory.set(key, {
      value,
      expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : null,
    });
    return;
  }
  const args: (string | number)[] = ["SET", key, value];
  if (ttlSeconds) args.push("EX", ttlSeconds);
  await command(args);
}

/**
 * Set only if absent. Returns true when this call created the key — used for
 * webhook idempotency, where "did I already process this event?" has to be a
 * single atomic question.
 */
export async function kvSetIfAbsent(
  key: string,
  value: string,
  ttlSeconds?: number
): Promise<boolean> {
  if (!kvIsDurable()) {
    if (memoryGet(key) !== null) return false;
    memory.set(key, {
      value,
      expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : null,
    });
    return true;
  }
  const args: (string | number)[] = ["SET", key, value, "NX"];
  if (ttlSeconds) args.push("EX", ttlSeconds);
  const result = await command<string | null>(args);
  return result === "OK";
}

/** Increment by `by`, applying a TTL only when the key is newly created. */
export async function kvIncrBy(
  key: string,
  by: number,
  ttlSeconds?: number
): Promise<number> {
  if (!kvIsDurable()) {
    const current = Number(memoryGet(key) ?? 0);
    const next = current + by;
    const existing = memory.get(key);
    memory.set(key, {
      value: String(next),
      expiresAt:
        existing?.expiresAt ??
        (ttlSeconds ? Date.now() + ttlSeconds * 1000 : null),
    });
    return next;
  }
  const next = await command<number>(["INCRBY", key, by]);
  if (ttlSeconds && next === by) {
    await command(["EXPIRE", key, ttlSeconds]);
  }
  return next;
}

export async function kvDelete(key: string): Promise<void> {
  if (!kvIsDurable()) {
    memory.delete(key);
    return;
  }
  await command(["DEL", key]);
}
