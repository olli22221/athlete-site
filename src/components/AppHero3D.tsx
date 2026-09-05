"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import PhoneMockup from "@/components/PhoneMockup";

// Loads the three.js scene on the client only — it is the heaviest thing on
// the site and there is no reason to ship it to pages that do not use it.
// Without WebGL the section falls back to the CSS phone on a still gradient.
const DesertPhoneScene = dynamic(() => import("@/components/DesertPhoneScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#f3d4b6]" />,
});

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function AppHero3D() {
  const [mode, setMode] = useState<"pending" | "webgl" | "fallback">("pending");

  useEffect(() => {
    // Decided after a microtask so the first client render matches the
    // server's "pending" markup exactly — no hydration mismatch on the div.
    let cancelled = false;
    void Promise.resolve().then(() => {
      if (!cancelled) setMode(hasWebGL() ? "webgl" : "fallback");
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (mode === "fallback") {
    return (
      <div className="flex items-center justify-center bg-gradient-to-b from-[#e6b48c] to-[#dba86f] py-16">
        <PhoneMockup />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      {mode === "webgl" ? (
        <DesertPhoneScene className="h-full w-full" />
      ) : (
        <div className="absolute inset-0 bg-[#f3d4b6]" />
      )}
    </div>
  );
}
