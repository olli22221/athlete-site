"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import PhoneMockup from "@/components/PhoneMockup";
import { siteConfig } from "@/lib/site-config";

// Loads the three.js scene on the client only — it is the heaviest thing on
// the site and there is no reason to ship it to pages that do not use it.
// The desert is a photograph underneath in every state, so the section looks
// right before the scene loads and without WebGL, where the CSS phone stands
// in for the 3D one.
const DesertPhoneScene = dynamic(() => import("@/components/DesertPhoneScene"), {
  ssr: false,
  loading: () => null,
});

const DESERT = siteConfig.media.desert;

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

  return (
    <div className="absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={DESERT}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[50%_60%]"
        draggable={false}
      />
      {mode === "webgl" && <DesertPhoneScene className="absolute inset-0 h-full w-full" />}
      {mode === "fallback" && (
        <div className="absolute inset-0 flex items-start justify-center pt-10 sm:items-center sm:pt-0">
          <PhoneMockup />
        </div>
      )}
    </div>
  );
}
