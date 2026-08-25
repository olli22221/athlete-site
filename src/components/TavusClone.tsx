"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, PhoneOff, Sparkles, Video } from "lucide-react";

type Status = "checking" | "unconfigured" | "idle" | "loading" | "active" | "error";

export default function TavusClone() {
  const [status, setStatus] = useState<Status>("checking");
  const [conversationUrl, setConversationUrl] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/tavus/status")
      .then((res) => res.json())
      .then((data) => setStatus(data.configured ? "idle" : "unconfigured"))
      .catch(() => setStatus("unconfigured"));
  }, []);

  const startConversation = useCallback(async () => {
    setStatus("loading");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/tavus/create-conversation", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Something went wrong.");
        setStatus(data.error === "not_configured" ? "unconfigured" : "error");
        return;
      }

      setConversationUrl(data.conversationUrl);
      setConversationId(data.conversationId);
      setStatus("active");
    } catch {
      setErrorMessage("Couldn't start the conversation. Please try again.");
      setStatus("error");
    }
  }, []);

  const endConversation = useCallback(async () => {
    if (conversationId) {
      fetch("/api/tavus/end-conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId }),
      }).catch(() => {});
    }
    setConversationUrl(null);
    setConversationId(null);
    setStatus("idle");
  }, [conversationId]);

  // end the call if the visitor navigates away mid-conversation
  useEffect(() => {
    if (status !== "active" || !conversationId) return;
    const onUnload = () => {
      navigator.sendBeacon?.(
        "/api/tavus/end-conversation",
        new Blob([JSON.stringify({ conversationId })], {
          type: "application/json",
        })
      );
    };
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [status, conversationId]);

  if (status === "active" && conversationUrl) {
    return (
      <div className="overflow-hidden rounded-2xl border border-line bg-black">
        <iframe
          src={conversationUrl}
          allow="camera; microphone; fullscreen; display-capture; autoplay"
          className="aspect-video w-full"
        />
        <div className="flex items-center justify-between border-t border-line bg-surface px-5 py-4">
          <span className="flex items-center gap-2 text-sm text-muted">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            Live conversation
          </span>
          <button
            onClick={endConversation}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs uppercase tracking-[0.15em] text-muted hover:border-red-400/60 hover:text-red-400"
          >
            <PhoneOff size={14} />
            End Conversation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-10 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
        {status === "checking" || status === "loading" ? (
          <Loader2 size={26} className="animate-spin" />
        ) : (
          <Video size={26} />
        )}
      </div>

      {status === "unconfigured" ? (
        <>
          <h3 className="font-display mt-6 text-2xl">
            AI Clone coming soon
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
            This is fully wired up to{" "}
            <a
              href="https://www.tavus.io"
              target="_blank"
              rel="noreferrer"
              className="text-accent underline underline-offset-4"
            >
              Tavus
            </a>{" "}
            — it just needs a replica. Create one at tavus.io, then add
            <code className="mx-1 rounded bg-background px-1.5 py-0.5 text-xs">
              TAVUS_API_KEY
            </code>
            and
            <code className="mx-1 rounded bg-background px-1.5 py-0.5 text-xs">
              TAVUS_REPLICA_ID
            </code>
            to your environment to go live.
          </p>
        </>
      ) : status === "error" ? (
        <>
          <h3 className="font-display mt-6 text-2xl">
            Couldn&apos;t connect
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
            {errorMessage}
          </p>
          <button
            onClick={startConversation}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-black"
          >
            Try Again
          </button>
        </>
      ) : (
        <>
          <h3 className="font-display mt-6 text-2xl">
            Ready when you are
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
            Starts a live, face-to-face video conversation with my AI
            clone. You&apos;ll be asked to allow camera & microphone
            access.
          </p>
          <button
            onClick={startConversation}
            disabled={status === "loading" || status === "checking"}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-black transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            <Sparkles size={16} />
            {status === "loading" ? "Connecting…" : "Start Conversation"}
          </button>
        </>
      )}
    </div>
  );
}
