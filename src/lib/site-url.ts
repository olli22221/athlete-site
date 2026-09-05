// ---------------------------------------------------------------------------
// The canonical origin, resolved once.
//
// `process.env.X ?? fallback` is not enough here: a variable that exists but
// is empty — which is what an env var added in a dashboard with no value looks
// like — passes straight through `??` and reaches `new URL("")`, which throws
// during the build with nothing but ERR_INVALID_URL to go on.
//
// So: treat empty and whitespace as absent, accept a bare hostname, and fall
// back rather than throw if the value is unusable. A wrong-looking canonical
// URL is a small problem; a build that dies collecting page data is not.
// ---------------------------------------------------------------------------

const LOCAL = "http://localhost:3000";

function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function normalize(value: string): string | undefined {
  // Vercel exposes its domains without a scheme; a hand-typed value may or
  // may not have one.
  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withScheme);
    return url.origin;
  } catch {
    return undefined;
  }
}

/**
 * Explicit configuration wins; otherwise fall back to the domain Vercel
 * already knows, so a deploy has correct absolute URLs before anyone has set
 * anything.
 */
export function siteUrl(): string {
  const candidates = [
    clean(process.env.NEXT_PUBLIC_SITE_URL),
    clean(process.env.VERCEL_PROJECT_PRODUCTION_URL),
    clean(process.env.VERCEL_URL),
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;
    const normalized = normalize(candidate);
    if (normalized) return normalized;
  }

  return LOCAL;
}
