"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// A phone in the desert.
//
// The desert is a photograph behind a transparent canvas — the image is
// public/media/desert.jpg, set as the section background by AppHero3D — and
// this scene draws only the phone on top of it. That keeps the picture
// swappable without touching any of this, and lets CSS crop it per screen.
//
// The phone is a rounded, extruded slab with a canvas-drawn screen. Drag to
// turn it; let go and it eases back with a little inertia. Under reduced
// motion the idle sway stops — dragging still works.

// Matches the light in the photograph: warm, low, from the left.
const WARM_SKY = 0xe6b48c;
const WARM_SAND = 0xdba86f;
const SUN_DIR = new THREE.Vector3(-0.55, 0.32, -0.75).normalize();

export default function DesertPhoneScene({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- renderer / scene / camera --------------------------------------
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    el.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "pan-y";
    renderer.domElement.style.cursor = "grab";

    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
    camera.position.set(0, 1.4, 4.2);
    camera.lookAt(0, 1.1, 0);

    // --- light for the phone ---------------------------------------------
    scene.add(new THREE.HemisphereLight(WARM_SKY, WARM_SAND, 0.9));
    const sunLight = new THREE.DirectionalLight(0xfff0dc, 1.6);
    sunLight.position.copy(SUN_DIR).multiplyScalar(10);
    scene.add(sunLight);
    const rim = new THREE.DirectionalLight(0xffe2c4, 0.5);
    rim.position.set(3, 2, 4);
    scene.add(rim);

    // --- phone -----------------------------------------------------------------
    const phone = new THREE.Group();
    let baseY = 1.12;
    phone.position.set(0, baseY, 0);
    scene.add(phone);

    const W = 0.74;
    const H = 1.52;
    const D = 0.075;
    const BEVEL = 0.012;
    const body = new THREE.Mesh(
      new THREE.ExtrudeGeometry(roundedRect(W, H, 0.13), {
        depth: D,
        bevelEnabled: true,
        bevelThickness: BEVEL,
        bevelSize: BEVEL,
        bevelSegments: 4,
        curveSegments: 24,
      }),
      // Low metalness on purpose: a metallic material with no environment map
      // reflects nothing and renders as a black hole. Dielectric + clearcoat
      // gives the lights something to catch.
      new THREE.MeshPhysicalMaterial({
        color: 0x1a2028,
        metalness: 0.12,
        roughness: 0.42,
        clearcoat: 0.7,
        clearcoatRoughness: 0.2,
      })
    );
    body.position.z = -D / 2;
    phone.add(body);

    const screenTexture = new THREE.CanvasTexture(drawScreen());
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    screenTexture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(W - 0.07, H - 0.07),
      new THREE.MeshBasicMaterial({ map: screenTexture, toneMapped: false })
    );
    // The bevel extends the extrusion past `depth` on both ends, so the front
    // cap sits at D/2 + BEVEL. Anything closer than that is inside the body.
    screen.position.z = D / 2 + BEVEL + 0.003;
    phone.add(screen);

    // camera island on the back, so turning it round shows a phone, not a slab
    const island = new THREE.Mesh(
      new THREE.ExtrudeGeometry(roundedRect(0.2, 0.2, 0.05), { depth: 0.02, bevelEnabled: false, curveSegments: 12 }),
      new THREE.MeshPhysicalMaterial({ color: 0x1b2027, metalness: 0.5, roughness: 0.3 })
    );
    island.position.set(-W / 2 + 0.16, H / 2 - 0.16, -D / 2 - BEVEL - 0.02);
    phone.add(island);
    for (const [x, y] of [
      [-0.045, 0.045],
      [0.045, -0.045],
    ]) {
      const lens = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.012, 24),
        new THREE.MeshPhysicalMaterial({ color: 0x05070a, metalness: 0.9, roughness: 0.15 })
      );
      lens.rotation.x = Math.PI / 2;
      lens.position.set(island.position.x + x, island.position.y + y, island.position.z - 0.008);
      phone.add(lens);
    }

    // --- interaction -----------------------------------------------------------
    const rot = { x: 0, y: -0.35 };
    const target = { x: 0, y: -0.35 };
    const rest = { x: 0, y: -0.35 };
    const velocity = { x: 0, y: 0 };
    let dragging = false;
    let last = { x: 0, y: 0 };
    let idleSince = performance.now();

    const canvas = renderer.domElement;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      last = { x: e.clientX, y: e.clientY };
      velocity.x = velocity.y = 0;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      last = { x: e.clientX, y: e.clientY };
      target.y += dx * 0.008;
      target.x = THREE.MathUtils.clamp(target.x + dy * 0.006, -0.55, 0.55);
      velocity.y = dx * 0.008;
      velocity.x = dy * 0.006;
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      idleSince = performance.now();
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
      canvas.style.cursor = "grab";
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onUp);

    // --- sizing ------------------------------------------------------------------
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      const aspect = w / h;
      camera.aspect = aspect;
      // Narrow screens: pull back, and lift the phone so the headline that
      // sits along the bottom edge has the floor to itself.
      const narrow = aspect < 0.8;
      camera.position.z = narrow ? 7.2 : aspect < 1.2 ? 5.0 : 4.2;
      baseY = narrow ? 2.45 : 1.12;
      camera.position.y = narrow ? 2.3 : 1.4;
      camera.lookAt(0, narrow ? 2.15 : 1.1, 0);
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(el);

    // --- loop ------------------------------------------------------------------
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(el);

    const timer = new THREE.Timer();
    function tick() {
      raf = 0;
      if (!visible || document.hidden) return;
      timer.update();
      const t = timer.getElapsed();

      if (!dragging) {
        // Inertia, then a slow drift home, then an idle sway on top.
        target.y += velocity.y;
        target.x = THREE.MathUtils.clamp(target.x + velocity.x, -0.55, 0.55);
        velocity.x *= 0.92;
        velocity.y *= 0.92;
        const idle = (performance.now() - idleSince) / 1000;
        if (idle > 2.5) {
          target.x += (rest.x - target.x) * 0.02;
          target.y += (rest.y - target.y) * 0.02;
        }
      }
      rot.x += (target.x - rot.x) * 0.14;
      rot.y += (target.y - rot.y) * 0.14;

      const sway = reduced ? 0 : Math.sin(t * 0.7) * 0.06;
      const bob = reduced ? 0 : Math.sin(t * 1.1) * 0.025;
      phone.rotation.set(rot.x, rot.y + sway, 0);
      phone.position.y = baseY + bob;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    const onVisibility = () => {
      if (!document.hidden && !raf) raf = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVisibility);

    // --- teardown ----------------------------------------------------------------
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onUp);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Sprite) {
          obj.geometry?.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
      screenTexture.dispose();
      renderer.dispose();
      if (canvas.parentNode === el) el.removeChild(canvas);
    };
  }, []);

  return <div ref={host} className={className} aria-hidden="true" />;
}

// --- helpers -----------------------------------------------------------------------

function roundedRect(w: number, h: number, r: number): THREE.Shape {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

// The concept screen, drawn once. Same content as the CSS mockup, so the two
// never disagree about what the app is supposed to look like.
function drawScreen(): HTMLCanvasElement {
  const W = 620;
  const H = 1330;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;

  const css = getComputedStyle(document.documentElement);
  const display = css.getPropertyValue("--font-archivo").trim() || "Archivo, Helvetica, Arial, sans-serif";
  const mono = css.getPropertyValue("--font-plex-mono").trim() || "ui-monospace, monospace";
  const sans = css.getPropertyValue("--font-public").trim() || "system-ui, sans-serif";

  const ink = "#e8edef";
  const soft = "#b3bfc6";
  const muted = "#77858c";
  const panel2 = "#151c22";
  const line = "#1c242a";
  const signal = "#5c6bff";
  const over = "#ff6a4a";

  ctx.fillStyle = "#0e1317";
  ctx.fillRect(0, 0, W, H);

  const pad = 44;
  let y = 96;

  ctx.fillStyle = muted;
  ctx.font = `500 22px ${mono}`;
  ctx.textBaseline = "alphabetic";
  spaced(ctx, "WEEK 3 · DAY 2", pad, y, 3);
  ctx.textAlign = "right";
  ctx.font = `400 20px ${mono}`;
  ctx.fillText("Target 59:30", W - pad, y);
  ctx.textAlign = "left";

  y += 70;
  ctx.fillStyle = ink;
  ctx.font = `700 40px ${display}`;
  ctx.fillText("COMPROMISED", pad, y);
  ctx.fillText("RUNNING", pad, y + 46);
  y += 84;
  ctx.fillStyle = muted;
  ctx.font = `400 24px ${sans}`;
  ctx.fillText("4 × (sled push 25 m → 800 m run)", pad, y);

  y += 44;
  const rows: [string, string, string][] = [
    ["Warm-up", "10:00", "easy"],
    ["Sled push", "25 m", "race weight"],
    ["Run", "800 m", "4:05 /km"],
    ["Rest", "2:00", ""],
  ];
  for (const [what, how, note] of rows) {
    ctx.fillStyle = panel2;
    ctx.fillRect(pad, y, W - pad * 2, 74);
    ctx.fillStyle = line;
    ctx.fillRect(pad, y + 74, W - pad * 2, 2);
    ctx.fillStyle = ink;
    ctx.font = `400 26px ${sans}`;
    ctx.fillText(what, pad + 26, y + 47);
    ctx.textAlign = "right";
    let right = W - pad - 26;
    if (note) {
      ctx.fillStyle = muted;
      ctx.font = `400 20px ${sans}`;
      ctx.fillText(note, right, y + 47);
      right -= ctx.measureText(note).width + 16;
    }
    ctx.fillStyle = ink;
    ctx.font = `500 26px ${mono}`;
    ctx.fillText(how, right, y + 47);
    ctx.textAlign = "left";
    y += 76;
  }

  y += 60;
  ctx.fillStyle = muted;
  ctx.font = `500 22px ${mono}`;
  spaced(ctx, "YOUR WEAKEST STATIONS", pad, y, 3);
  y += 36;
  const bars: [string, number][] = [
    ["SKI", 0.72],
    ["PUSH", 0.55],
    ["PULL", 0.38],
  ];
  for (const [label, v] of bars) {
    const trackW = W - pad * 2 - 110;
    ctx.fillStyle = line;
    ctx.fillRect(pad, y, trackW, 10);
    ctx.fillStyle = over;
    ctx.fillRect(pad, y, trackW * v, 10);
    ctx.fillStyle = soft;
    ctx.font = `500 20px ${mono}`;
    ctx.textAlign = "right";
    ctx.fillText(label, W - pad, y + 11);
    ctx.textAlign = "left";
    y += 40;
  }

  // bottom bar
  const by = H - 120;
  ctx.fillStyle = line;
  ctx.fillRect(pad, by - 30, W - pad * 2, 2);
  ctx.fillStyle = muted;
  ctx.font = `400 22px ${sans}`;
  ctx.fillText("Log session", pad, by + 20);
  roundRect(ctx, W - pad - 150, by - 8, 150, 52, 6);
  ctx.fillStyle = signal;
  ctx.fill();
  ctx.fillStyle = "#07090b";
  ctx.font = `700 22px ${display}`;
  ctx.textAlign = "center";
  ctx.fillText("START", W - pad - 75, by + 27);
  ctx.textAlign = "left";

  // glass: a faint diagonal sheen so the screen reads as glass, not paper
  const sheen = ctx.createLinearGradient(0, 0, W, H);
  sheen.addColorStop(0, "rgba(255,255,255,0.10)");
  sheen.addColorStop(0.35, "rgba(255,255,255,0.02)");
  sheen.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, W, H);

  return c;
}

function spaced(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, tracking: number) {
  let cx = x;
  for (const ch of text) {
    ctx.fillText(ch, cx, y);
    cx += ctx.measureText(ch).width + tracking;
  }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
