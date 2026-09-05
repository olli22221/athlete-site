"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import DonationTin from "@/components/DonationTin";
import { AVATAR_SESSION, formatEuro } from "@/lib/avatar-tiers";

type Status = {
  avatarConfigured: boolean;
  paymentsConfigured: boolean;
  durableStore: boolean;
};

type Live = { url: string; conversationId: string; endsAt: number };

export default function AvatarStudio({ purchase }: { purchase?: string }) {
  const [status, setStatus] = useState<Status | null>(null);
  const [sessionsLeft, setSessionsLeft] = useState<number | null>(null);
  const [live, setLive] = useState<Live | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const price = formatEuro(AVATAR_SESSION.amountCents);

  const refreshWallet = useCallback(async () => {
    const response = await fetch("/api/avatar/wallet", { cache: "no-store" });
    if (response.ok) {
      const data = await response.json();
      setSessionsLeft(data.sessionsLeft ?? 0);
    }
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
      if (walletResult.status === "fulfilled") {
        setSessionsLeft(walletResult.value.sessionsLeft ?? 0);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  // A visible countdown: the session is a bought quantity, so hiding how much
  // of it is left would be the wrong kind of surprise.
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

  async function startSession() {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/avatar/session", { method: "POST" });
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
      });
      setSessionsLeft(data.sessionsLeft ?? 0);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function buy() {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", { method: "POST" });
      const data = await response.json();
      if (!response.ok || !data.url) {
        setError(data.message ?? "Couldn't start the checkout.");
        return;
      }
      window.location.assign(data.url);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  // --- live session -------------------------------------------------------
  if (live) {
    return (
      <div className="border border-signal">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-panel px-4 py-3">
          <span className="label !text-signal">Live</span>
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

  const ready = (sessionsLeft ?? 0) > 0;
  const blocked =
    status !== null && (!status.avatarConfigured || (!ready && !status.paymentsConfigured));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start">
      <DonationTin
        price={price}
        state={busy ? "busy" : ready ? "ready" : "buy"}
        onClick={ready ? startSession : buy}
        disabled={busy || blocked}
      />

      <div className="flex flex-col gap-5">
        {purchase === "success" && (
          <Notice title="Payment received" tone="under">
            Your session is paid for. If the tin still asks for money, give the
            payment a few seconds and reload.
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
        {status && !status.avatarConfigured && (
          <Notice title="Avatar not connected yet">
            Sessions cannot start until <code className="text-signal">TAVUS_API_KEY</code>,{" "}
            <code className="text-signal">TAVUS_REPLICA_ID</code> and{" "}
            <code className="text-signal">APP_SECRET</code> are set. See{" "}
            <code>.env.example</code>.
          </Notice>
        )}
        {status && status.avatarConfigured && !status.paymentsConfigured && !ready && (
          <Notice title="Payments not configured yet">
            Add <code className="text-signal">STRIPE_SECRET_KEY</code> plus an
            Upstash Redis URL and token, then reload.
          </Notice>
        )}

        <div>
          <h2 className="board text-2xl">{AVATAR_SESSION.label}</h2>
          <p className="mt-3 max-w-xl text-ink-soft">{AVATAR_SESSION.blurb}</p>
        </div>

        <dl className="flex flex-col gap-px bg-line">
          <Row term={price}>
            The whole price. Final — no VAT is added, under the German
            small-business rule (§ 19 UStG).
          </Row>
          <Row term="One payment, one session">
            Not a subscription. Nothing recurring, nothing to cancel.
          </Row>
          <Row term="Seven minutes, hard stop">
            The clock starts when the conversation opens. Ending early stops the
            cost but does not return the session.
          </Row>
          <Row term="Why it costs anything">
            Every minute of conversation is billed to me by the minute. The
            price covers that — it is not the business model.
          </Row>
        </dl>

        {sessionsLeft !== null && sessionsLeft > 0 && (
          <p className="tnum text-sm text-under">
            {sessionsLeft} session{sessionsLeft === 1 ? "" : "s"} paid for on this device.
          </p>
        )}
      </div>
    </div>
  );
}

function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="bg-panel px-5 py-4">
      <dt className="board-sm text-sm text-signal">{term}</dt>
      <dd className="mt-1 text-sm text-ink-soft">{children}</dd>
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
