"use client";

import { useEffect, useState } from "react";

const PLATFORMS = [
  { id: "ios", label: "iOS" },
  { id: "android", label: "Android" },
  { id: "either", label: "Either" },
] as const;

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState<string>("either");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch("/api/waitlist", { cache: "no-store" });
        const data = await response.json();
        if (!cancelled && typeof data.count === "number") setCount(data.count);
      } catch {
        // A missing count is not worth showing an error over.
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setState("sending");
    setMessage(null);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, platform }),
      });
      const data = await response.json();
      if (!response.ok) {
        setState("error");
        setMessage(data.message ?? "That didn't work.");
        return;
      }
      setState("done");
      setMessage(data.message);
      setCount((current) => (current !== null && !data.alreadyOnList ? current + 1 : current));
    } catch {
      setState("error");
      setMessage("Network error. Try again.");
    }
  }

  if (state === "done") {
    return (
      <div className="border-l-2 border-under bg-panel px-5 py-4">
        <p className="board-sm text-sm">On the list</p>
        <p className="mt-1 text-sm text-ink-soft">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 border border-line bg-panel p-5">
      <div>
        <label className="label" htmlFor="waitlist-email">
          Email
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="mt-2 w-full border border-line bg-ground px-3 py-2.5 text-sm outline-none focus:border-signal"
        />
      </div>

      <fieldset>
        <legend className="label">Which phone</legend>
        <div className="mt-2 flex gap-2">
          {PLATFORMS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setPlatform(option.id)}
              aria-pressed={platform === option.id}
              className={`board-sm flex-1 border px-3 py-2 text-xs ${
                platform === option.id
                  ? "border-signal text-signal"
                  : "border-line text-muted hover:text-ink"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={state === "sending"}
        className="board-sm bg-signal px-4 py-3 text-sm text-signal-ink disabled:opacity-50"
      >
        {state === "sending" ? "Adding…" : "Tell me when it ships"}
      </button>

      {message && state === "error" && <p className="text-sm text-over">{message}</p>}

      <p className="text-xs text-muted">
        {count !== null && count > 0
          ? `${count} ${count === 1 ? "person is" : "people are"} on the list. `
          : ""}
        One email when there is something to install. No newsletter unless you
        ask for one separately.
      </p>
    </form>
  );
}
