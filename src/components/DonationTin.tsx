"use client";

// The tin. One object, one action: click it, pay, get seven minutes.
//
// Drawn rather than photographed so it sits inside the site's own geometry —
// flat planes, hard edges, the same ultramarine as everything else that can be
// pressed. The coin drops toward the slot on hover and on focus, and holds
// still for anyone who has asked for reduced motion.

export default function DonationTin({
  price,
  state,
  onClick,
  disabled,
}: {
  price: string;
  /** "buy" — nothing paid for yet · "ready" — a session is waiting · "busy" */
  state: "buy" | "ready" | "busy";
  onClick: () => void;
  disabled?: boolean;
}) {
  const label =
    state === "ready"
      ? "Start your seven minutes"
      : state === "busy"
        ? "Working…"
        : `Drop ${price} in the tin for seven minutes`;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="tin group flex w-full flex-col items-center gap-5 border border-line bg-panel px-6 py-8 transition-colors hover:border-signal disabled:opacity-60"
    >
      <svg
        viewBox="0 0 200 240"
        className="h-64 w-auto"
        role="presentation"
        aria-hidden="true"
      >
        {/* coin — drops toward the slot on hover/focus */}
        <g className="tin-coin">
          <circle cx="100" cy="30" r="14" fill="var(--signal)" />
          <circle cx="100" cy="30" r="8" fill="none" stroke="var(--ground)" strokeWidth="2" />
        </g>

        {/* body first, so the lid overlaps it */}
        <rect
          x="38"
          y="84"
          width="124"
          height="140"
          fill="var(--panel-2)"
          stroke="var(--ink-soft)"
          strokeWidth="1.5"
        />

        {/* seams — what makes it read as a tin rather than a box */}
        <line x1="60" y1="84" x2="60" y2="224" stroke="var(--line)" strokeWidth="1" />
        <line x1="140" y1="84" x2="140" y2="224" stroke="var(--line)" strokeWidth="1" />

        {/* lid + slot */}
        <rect
          x="30"
          y="64"
          width="140"
          height="22"
          fill="var(--panel-2)"
          stroke="var(--ink-soft)"
          strokeWidth="1.5"
        />
        <rect x="80" y="71" width="40" height="7" fill="var(--ground)" />

        {/* label band */}
        <rect x="38" y="120" width="124" height="62" fill="var(--signal)" />
        <text
          x="100"
          y="150"
          textAnchor="middle"
          fill="var(--signal-ink)"
          className="tin-price"
        >
          {price}
        </text>
        <text
          x="100"
          y="169"
          textAnchor="middle"
          fill="var(--signal-ink)"
          className="tin-sub"
        >
          7 MINUTES
        </text>

        {/* base */}
        <rect x="38" y="224" width="124" height="9" fill="var(--ink-soft)" />
      </svg>

      <span className="flex flex-col items-center gap-1">
        <span className="board-sm text-base">
          {state === "ready" ? "Start" : state === "busy" ? "Working…" : "Pay with Stripe"}
        </span>
        <span className="text-xs text-muted">
          {state === "ready"
            ? "One session paid for and waiting"
            : "Card payment · final price, no VAT added"}
        </span>
      </span>
    </button>
  );
}
