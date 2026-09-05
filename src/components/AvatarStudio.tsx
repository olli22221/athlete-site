"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AVATAR_TIERS,
  CREDIT_PACKS,
  type AvatarTierId,
  formatEuro,
  unitPriceCents,
} from "@/lib/avatar-tiers";

type Status = {
  avatarConfigured: boolean;
  paymentsConfigured: boolean;
  durableStore: boolean;
};

type WalletState = {
  sessionsLeft: number;
  leadAvailable: boolean;
  emailKnown: boolean;
};

type Live = {
  url: string;
  conversationId: string;
  endsAt: number;
  tier: AvatarTierId;
};

export default function AvatarStudio({ purchase }: { purchase?: string }) {
  const [status, setStatus] = useState<Status | null>(null);
  const [wallet, setWallet] = useState<WalletState | null>(null);
  const [live, setLive] = useState<Live | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [busy, setBusy] = useState<AvatarTierId | "checkout" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [emailNote, setEmailNote] = useState<string | null>(null);

  const refreshWallet = useCallback(async () => {
    const response = await fetch("/api/avatar/wallet", { cache: "no-store" });
    if (response.ok) setWallet(await response.json());
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [statusResult, walletResult] = await Promise.allSettled([
        fetch("/api/avatar/status", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/avatar/wallet", { cache: "no-store" }).then((r) => r.json()),
      ]);
      if (cancelled) return;

      setStatus(
        statusResult.status === "fulfilled"
          ? statusResult.value
          : { avatarConfigured: false, paymentsConfigured: false, durableStore: false }
      );
      if (walletResult.status === "fulfilled") setWallet(walletResult.value);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  // A visible countdown, because the session is a bought quantity and hiding
  // how much of it is left would be the wrong kind of surprise.
  useEffect(() => {
    if (!live) return;
    const tick = () => {
      const left = Math.max(0, Math.round((live.endsAt - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) setLive(null);
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [live]);

  const endedRef = useRef<string | null>(null);
  const endSession = useCallback(async () => {
    if (!live || endedRef.current === live.conversationId) {
      setLive(null);
      return;
    }
    endedRef.current = live.conversationId;
    setLive(null);
    await fetch("/api/avatar/end", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId: live.conversationId }),
    }).catch(() => {});
    void refreshWallet();
  }, [live, refreshWallet]);

  async function startSession(tier: AvatarTierId) {
    setBusy(tier);
    setError(null);
    try {
      const response = await fetch("/api/avatar/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message ?? "Couldn't start the session.");
        void refreshWallet();
        return;
      }
      setLive({
        url: data.conversationUrl,
        conversationId: data.conversationId,
        endsAt: Date.now() + data.seconds * 1000,
        tier,
      });
      void refreshWallet();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(null);
    }
  }

  async function submitEmail(event: React.FormEvent) {
    event.preventDefault();
    setBusy("lead");
    setError(null);
    setEmailNote(null);
    try {
      const response = await fetch("/api/avatar/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newsletter }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message ?? "Couldn't save that address.");
        return;
      }
      setEmailNote(data.message);
      await refreshWallet();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(null);
    }
  }

  async function buy(packId: string) {
    setBusy("checkout");
    setError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pack: packId }),
      });
      const data = await response.json();
      if (!response.ok || !data.url) {
        setError(data.message ?? "Couldn't start the checkout.");
        return;
      }
      window.location.assign(data.url);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(null);
    }
  }

  // --- live session -------------------------------------------------------
  if (live) {
    return (
      <div className="border border-signal">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-panel px-4 py-3">
          <span className="label !text-signal">
            {AVATAR_TIERS[live.tier].label} · live
          </span>
          <span className="flex items-center gap-4">
            <span className="tnum text-lg">
              {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={endSession}
              className="board-sm border border-line px-3 py-1.5 text-xs hover:border-over hover:text-over"
            >
              End now
            </button>
          </span>
        </div>
        <iframe
          src={live.url}
          allow="camera; microphone; fullscreen; display-capture; autoplay"
          className="aspect-video w-full bg-black"
          title="Video avatar conversation"
        />
        <p className="border-t border-line px-4 py-3 text-xs text-muted">
          Ending early stops the clock immediately — it does not refund the
          session, so use the time.
        </p>
      </div>
    );
  }

  // --- tier picker --------------------------------------------------------
  const avatarReady = status?.avatarConfigured !== false;
  const disabled = busy !== null || !avatarReady;

  return (
    <div className="flex flex-col gap-8">
      {status && !avatarReady && (
        <Notice title="Avatar not connected yet">
          The tiers below are live, but sessions cannot start until{" "}
          <code className="text-signal">TAVUS_API_KEY</code> and{" "}
          <code className="text-signal">TAVUS_REPLICA_ID</code> are set. See{" "}
          <code>.env.example</code>.
        </Notice>
      )}
      {purchase === "success" && (
        <Notice title="Payment received" tone="under">
          Your credits are on this device. If the count below still shows zero,
          give the payment a few seconds and reload.
        </Notice>
      )}
      {purchase === "cancelled" && (
        <Notice title="Checkout cancelled">Nothing was charged.</Notice>
      )}
      {error && (
        <Notice title="That didn't work" tone="over">
          {error}
        </Notice>
      )}

      <div className="grid gap-px bg-line lg:grid-cols-3">
        {/* Tier 1 — free taster */}
        <TierCard tier="teaser">
          <button
            type="button"
            onClick={() => startSession("teaser")}
            disabled={disabled}
            className="board-sm w-full border border-line px-4 py-3 text-sm hover:border-signal hover:text-signal disabled:opacity-50"
          >
            {busy === "teaser" ? "Starting…" : "Start 60 seconds"}
          </button>
        </TierCard>

        {/* Tier 2 — the lead gate, which is the actual point */}
        <TierCard tier="lead">
          {wallet?.leadAvailable ? (
            <button
              type="button"
              onClick={() => startSession("lead")}
              disabled={disabled}
              className="board-sm w-full bg-signal px-4 py-3 text-sm text-signal-ink disabled:opacity-50"
            >
              {busy === "lead" ? "Starting…" : "Start 5 minutes"}
            </button>
          ) : wallet?.emailKnown ? (
            <p className="text-sm text-muted">
              Already used on this device. Credits below keep it going.
            </p>
          ) : (
            <form onSubmit={submitEmail} className="flex flex-col gap-3">
              <label className="label" htmlFor="avatar-email">
                Email
              </label>
              <input
                id="avatar-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="border border-line bg-ground px-3 py-2 text-sm outline-none focus:border-signal"
              />
              <label className="flex items-start gap-2 text-xs text-muted">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(event) => setNewsletter(event.target.checked)}
                  className="mt-0.5"
                />
                Also send me the race newsletter. You will get a confirmation
                email first — the session unlocks either way.
              </label>
              <button
                type="submit"
                disabled={busy !== null}
                className="board-sm w-full bg-signal px-4 py-3 text-sm text-signal-ink disabled:opacity-50"
              >
                {busy === "lead" ? "Saving…" : "Unlock 5 minutes"}
              </button>
              {emailNote && <p className="text-xs text-under">{emailNote}</p>}
            </form>
          )}
        </TierCard>

        {/* Tier 3 — paid */}
        <TierCard tier="paid" footnote={`${wallet?.sessionsLeft ?? 0} credits on this device`}>
          {wallet && wallet.sessionsLeft > 0 ? (
            <button
              type="button"
              onClick={() => startSession("paid")}
              disabled={disabled}
              className="board-sm w-full bg-signal px-4 py-3 text-sm text-signal-ink disabled:opacity-50"
            >
              {busy === "paid" ? "Starting…" : "Use one credit"}
            </button>
          ) : (
            <p className="text-sm text-muted">Buy a pack below to unlock.</p>
          )}
        </TierCard>
      </div>

      {/* --- packs ---------------------------------------------------------- */}
      <div>
        <h2 className="board text-2xl">Credits</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          One credit is one seven-minute session. Prices are final — no VAT is
          added (small-business rule, § 19 UStG). Credits live on this device
          and do not expire.
        </p>

        {status && !status.paymentsConfigured ? (
          <div className="mt-5">
            <Notice title="Payments not configured yet">
              Add <code className="text-signal">STRIPE_SECRET_KEY</code> plus an
              Upstash Redis URL and token, then reload.
            </Notice>
          </div>
        ) : (
          <ul className="mt-5 grid gap-px bg-line sm:grid-cols-3">
            {CREDIT_PACKS.map((pack) => (
              <li key={pack.id} className="flex flex-col gap-3 bg-panel p-5">
                <span className="label">{pack.label}</span>
                <span className="tnum text-3xl">{formatEuro(pack.amountCents)}</span>
                <span className="text-xs text-muted">
                  {formatEuro(unitPriceCents(pack))} per session ·{" "}
                  {pack.sessions * 7} minutes total
                </span>
                <button
                  type="button"
                  onClick={() => buy(pack.id)}
                  disabled={busy !== null}
                  className={`board-sm mt-auto px-4 py-3 text-sm disabled:opacity-50 ${
                    pack.highlight
                      ? "bg-signal text-signal-ink"
                      : "border border-line hover:border-signal hover:text-signal"
                  }`}
                >
                  {busy === "checkout" ? "…" : "Buy"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function TierCard({
  tier,
  children,
  footnote,
}: {
  tier: AvatarTierId;
  children: React.ReactNode;
  footnote?: string;
}) {
  const config = AVATAR_TIERS[tier];
  return (
    <div className="flex flex-col gap-4 bg-panel p-6">
      <div>
        <p className="label">{config.label}</p>
        <p className="tnum mt-2 text-3xl">
          {config.seconds >= 60 ? `${config.seconds / 60} min` : `${config.seconds}s`}
        </p>
        <p className="mt-3 text-sm text-ink-soft">{config.blurb}</p>
      </div>
      <div className="mt-auto">{children}</div>
      {footnote && <p className="tnum text-xs text-muted">{footnote}</p>}
    </div>
  );
}

function Notice({
  title,
  children,
  tone = "neutral",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "neutral" | "under" | "over";
}) {
  const border =
    tone === "under" ? "border-under" : tone === "over" ? "border-over" : "border-line";
  return (
    <div className={`border-l-2 ${border} bg-panel px-4 py-3`}>
      <p className="board-sm text-sm">{title}</p>
      <p className="mt-1 text-sm text-ink-soft">{children}</p>
    </div>
  );
}
