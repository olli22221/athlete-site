"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// A phone in a desert that never ends.
//
// The ground is one plane whose height comes from layered noise in the vertex
// shader, sampled at an offset that moves with time — so the dunes roll
// toward the camera forever without a single vertex being added or moved on
// the CPU. Fog blends the far edge into the sky, which is what makes the
// horizon read as endless rather than as the edge of a plane.
//
// The phone is a rounded, extruded slab with a canvas-drawn screen. Drag to
// turn it; let go and it eases back with a little inertia. Under reduced
// motion the dunes stop flowing and the idle sway stops — dragging still works.

const SKY_ZENITH = 0xe6b48c;
const SKY_HORIZON = 0xf7dcc0;
const FOG = 0xf3d4b6;
const SAND_LIT = 0xdba86f;
const SAND_SHADE = 0x9a6a41;
const SUN_DIR = new THREE.Vector3(-0.55, 0.32, -0.75).normalize();

export default function DesertPhoneScene({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- renderer / scene / camera --------------------------------------
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    el.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "pan-y";
    renderer.domElement.style.cursor = "grab";

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(SKY_HORIZON);

    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 500);
    camera.position.set(0, 1.55, 5.6);
    camera.lookAt(0, 1.05, 0);

    // --- sky dome + sun ----------------------------------------------------
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(300, 32, 16),
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: {
          zenith: { value: new THREE.Color(SKY_ZENITH) },
          horizon: { value: new THREE.Color(SKY_HORIZON) },
        },
        vertexShader: `
          varying float vY;
          void main() {
            vY = normalize(position).y;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: `
          uniform vec3 zenith; uniform vec3 horizon; varying float vY;
          void main() {
            float t = smoothstep(-0.05, 0.55, vY);
            gl_FragColor = vec4(mix(horizon, zenith, t), 1.0);
          }`,
      })
    );
    scene.add(sky);

    const sunTexture = radialTexture();
    const sun = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: sunTexture, transparent: true, depthWrite: false, opacity: 0.95 })
    );
    sun.scale.set(70, 70, 1);
    sun.position.copy(SUN_DIR).multiplyScalar(240).add(new THREE.Vector3(0, 6, 0));
    scene.add(sun);

    // --- dunes ---------------------------------------------------------------
    const groundUniforms = {
      uTime: { value: 0 },
      uSpeed: { value: reduced ? 0 : 0.9 },
      uSun: { value: SUN_DIR.clone() },
      uLit: { value: new THREE.Color(SAND_LIT) },
      uShade: { value: new THREE.Color(SAND_SHADE) },
      uFog: { value: new THREE.Color(FOG) },
    };
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(360, 360, 240, 240),
      new THREE.ShaderMaterial({
        uniforms: groundUniforms,
        vertexShader: DUNE_VERT,
        fragmentShader: DUNE_FRAG,
      })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, 0, -140);
    scene.add(ground);

    // --- light for the phone ---------------------------------------------
    scene.add(new THREE.HemisphereLight(SKY_ZENITH, SAND_LIT, 0.9));
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
      camera.position.z = narrow ? 8.8 : aspect < 1.2 ? 6.4 : 5.6;
      baseY = narrow ? 2.45 : 1.12;
      camera.position.y = narrow ? 2.3 : 1.55;
      camera.lookAt(0, narrow ? 2.15 : 1.05, 0);
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
      groundUniforms.uTime.value = t;

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
      sunTexture.dispose();
      renderer.dispose();
      if (canvas.parentNode === el) el.removeChild(canvas);
    };
  }, []);

  return <div ref={host} className={className} aria-hidden="true" />;
}

// --- shaders ---------------------------------------------------------------------

const NOISE = `
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float vnoise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * vnoise(p); p = p * 2.03 + vec2(17.0, 9.0); a *= 0.5; }
    return v;
  }
  // World-space height. The z offset by time is the whole "never ending"
  // trick: the same dunes, sampled a little further along each frame.
  float height(vec2 xz, float t, float speed) {
    vec2 p = xz + vec2(0.0, t * speed);
    float big   = (fbm(p * 0.016) - 0.5) * 20.0;   // rolling hills
    float dune  = (fbm(p * 0.055 + 3.1) - 0.5) * 4.6; // dunes
    float rip   = (vnoise(p * 1.1) - 0.5) * 0.18;   // ripples
    // Flatten a patch near the camera so the phone has ground to hover over.
    float near = smoothstep(3.0, 20.0, length(xz - vec2(0.0, 140.0)));
    return (big + dune) * near + rip - 0.4;
  }
`;

const DUNE_VERT = `
  uniform float uTime; uniform float uSpeed;
  varying vec3 vNormal; varying vec3 vWorld;
  ${NOISE}
  void main() {
    // plane is rotated -90° about X, so local (x, y) maps to world (x, -z)
    vec2 xz = vec2(position.x, position.y);
    float h  = height(xz, uTime, uSpeed);
    float e = 0.6;
    float hx = height(xz + vec2(e, 0.0), uTime, uSpeed);
    float hz = height(xz + vec2(0.0, e), uTime, uSpeed);
    vec3 n = normalize(vec3(h - hx, e, h - hz));
    vNormal = n;
    vec3 displaced = vec3(position.x, position.y, h);
    vec4 world = modelMatrix * vec4(displaced, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const DUNE_FRAG = `
  uniform vec3 uSun; uniform vec3 uLit; uniform vec3 uShade; uniform vec3 uFog;
  varying vec3 vNormal; varying vec3 vWorld;
  void main() {
    vec3 n = normalize(vNormal);
    float diff = clamp(dot(n, uSun), 0.0, 1.0);
    float wrap = clamp(dot(n, uSun) * 0.5 + 0.5, 0.0, 1.0);
    vec3 col = mix(uShade, uLit, mix(wrap, diff, 0.6));
    // slight warmth on crests facing the sun
    col += vec3(0.08, 0.04, 0.0) * pow(diff, 3.0);
    float dist = length(vWorld - cameraPosition);
    float fog = 1.0 - exp(-pow(dist * 0.0105, 1.6));
    col = mix(col, uFog, clamp(fog, 0.0, 1.0));
    gl_FragColor = vec4(col, 1.0);
  }
`;

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

function radialTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, "rgba(255,246,228,1)");
  g.addColorStop(0.18, "rgba(255,232,200,0.9)");
  g.addColorStop(0.5, "rgba(255,214,170,0.25)");
  g.addColorStop(1, "rgba(255,214,170,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
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
