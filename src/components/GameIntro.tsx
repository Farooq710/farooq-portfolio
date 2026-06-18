"use client";

/**
 * GameIntro — a pixel/synthwave side-scrolling platformer intro.
 * Drop-in replacement for SplashScreen: renders fullscreen, plays once (~12s),
 * then calls onComplete(). A "SKIP ▶" button and PRESS START / any key let the
 * visitor enter early. Self-contained: no extra dependencies.
 */

import { useEffect, useRef, useState, useCallback } from "react";

// ── timing ───────────────────────────────────────────────────────────────────
const DURATION = 12.4; // seconds; after this the site is revealed automatically

// ── easing + interpolation ──────────────────────────────────────────────────
type EaseFn = (t: number) => number;
const Easing = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeOutSine: (t: number) => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeOutBack: (t: number) => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
} satisfies Record<string, EaseFn>;

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

function interpolate(
  input: number[],
  output: number[],
  ease: EaseFn | EaseFn[] = Easing.linear
) {
  return (t: number) => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const fn = Array.isArray(ease) ? ease[i] || Easing.linear : ease;
        return output[i] + (output[i + 1] - output[i]) * fn(local);
      }
    }
    return output[output.length - 1];
  };
}

function animate({
  from = 0,
  to = 1,
  start = 0,
  end = 1,
  ease = Easing.easeInOutCubic,
}: {
  from?: number;
  to?: number;
  start?: number;
  end?: number;
  ease?: EaseFn;
}) {
  return (t: number) => {
    if (t <= start) return from;
    if (t >= end) return to;
    return from + (to - from) * ease((t - start) / (end - start));
  };
}

// ── palette ───────────────────────────────────────────────────────────────
const PAL = {
  skyTop: "#160a36",
  skyMid: "#5a1c7e",
  skyLow: "#ff5f8d",
  skyGlow: "#ff9a3c",
  sun1: "#ffe14d",
  sun2: "#ff7a3c",
  sun3: "#ff3d7f",
  hill: "#260d4c",
  hillRim: "#ff2a6d",
  cyan: "#2ee6f6",
  cyanHi: "#9af7ff",
  cyanDk: "#0b6e8c",
  mag: "#ff3d7f",
  magDk: "#c92d63",
  navy: "#150c2c",
  gold: "#ffd23f",
  goldHi: "#fff4b8",
  goldDk: "#b8860b",
  ground: "#190f38",
  groundEdge: "#2ee6f6",
  brickLine: "#0d0826",
  white: "#ffffff",
};
const PXFONT = "'Press Start 2P', monospace";

const GROUND_TOP = 880;
const HERO_X = 520;
const HERO_W = 112;
const HERO_H = 144;

const scrollX = interpolate(
  [0, 2.4, 8.6, 9.4, 12],
  [0, 110, 3200, 3520, 3520],
  [
    Easing.easeOutSine,
    Easing.easeInOutSine,
    Easing.easeOutCubic,
    Easing.linear,
  ]
);

const JUMPS = [3.6, 5.2, 6.8, 9.0];
function jumpOffset(t: number) {
  for (const c of JUMPS) {
    const a = c - 0.46,
      b = c + 0.46;
    if (t >= a && t <= b) {
      const l = (t - a) / (b - a);
      return -170 * Math.sin(Math.PI * l);
    }
  }
  return 0;
}

const BLOCKS = [
  { hit: 3.6, label: "DOCKER", top: 496 },
  { hit: 5.2, label: "KUBERNETES", top: 460 },
  { hit: 6.8, label: "AWS", top: 496 },
].map((b) => ({ ...b, worldX: scrollX(b.hit) + 560 }));

const FLAG_WORLD = 4080;
const CASTLE_WORLD = FLAG_WORLD + 280;
const FLOAT_BASE = scrollX(4.2) + 720;
const FLOAT = [0, 1, 2, 3, 4].map((i) => ({
  worldX: FLOAT_BASE + i * 90,
  y: 700 - Math.sin((i / 4) * Math.PI) * 70,
}));

// ── tiny rect helper ──────────────────────────────────────────────────────
const R = (
  x: number,
  y: number,
  w: number,
  h: number,
  bg: string,
  extra?: React.CSSProperties,
  key?: React.Key
) => (
  <div
    key={key}
    style={{ position: "absolute", left: x, top: y, width: w, height: h, background: bg, ...extra }}
  />
);

// ── pixel-grid renderer ─────────────────────────────────────────────────────
function Px({
  rows,
  map,
  px = 6,
  style,
}: {
  rows: string[];
  map: Record<string, string>;
  px?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ position: "relative", width: rows[0].length * px, height: rows.length * px, ...style }}>
      {rows.flatMap((row, y) =>
        row.split("").map((c, x) =>
          map[c] ? (
            <div
              key={x + "_" + y}
              style={{ position: "absolute", left: x * px, top: y * px, width: px, height: px, background: map[c] }}
            />
          ) : null
        )
      )}
    </div>
  );
}

const COIN_ROWS = [
  "..gggg..",
  ".gyhhyg.",
  "gyhyyhyg",
  "gyhyyhyg",
  "gyhyyhyg",
  "gyhyyhyg",
  "gyhyyhyg",
  "gyhyyhyg",
  ".gyhhyg.",
  "..gggg..",
];
const COIN_MAP = { g: PAL.goldDk, y: PAL.gold, h: PAL.goldHi };
function Coin({ px = 4, phase = 0, style }: { px?: number; phase?: number; style?: React.CSSProperties }) {
  return (
    <div style={style}>
      <div style={{ transform: `scaleX(${Math.cos(phase)})` }}>
        <Px rows={COIN_ROWS} map={COIN_MAP} px={px} />
      </div>
    </div>
  );
}

// ── hero sprite (blocky, with run cycle) ─────────────────────────────────────
function HeroSprite({ t, running, jumping }: { t: number; running: boolean; jumping: boolean }) {
  const navy = PAL.navy;
  const ol: React.CSSProperties = { boxShadow: `inset 0 0 0 4px ${navy}` };
  const frame = jumping ? 2 : running ? Math.floor(t * 9) % 2 : 0;
  const bob = running && !jumping ? Math.round(Math.sin(t * 12) * 2) : 0;

  let legs: React.ReactNode;
  if (frame === 2) {
    legs = (
      <>
        {R(24, 102, 24, 26, PAL.magDk, ol, "l1")}
        {R(20, 122, 30, 10, PAL.cyanDk, undefined, "l2")}
        {R(64, 102, 24, 26, PAL.mag, ol, "l3")}
        {R(62, 122, 30, 10, PAL.cyan, undefined, "l4")}
      </>
    );
  } else if (frame === 0) {
    legs = (
      <>
        {R(26, 104, 22, 30, PAL.magDk, ol, "l1")}
        {R(22, 132, 30, 10, PAL.cyanDk, undefined, "l2")}
        {R(64, 104, 22, 24, PAL.mag, ol, "l3")}
        {R(66, 124, 26, 10, PAL.cyan, undefined, "l4")}
      </>
    );
  } else {
    legs = (
      <>
        {R(20, 104, 22, 24, PAL.mag, ol, "l1")}
        {R(16, 124, 28, 10, PAL.cyan, undefined, "l2")}
        {R(68, 104, 22, 30, PAL.magDk, ol, "l3")}
        {R(66, 132, 30, 10, PAL.cyanDk, undefined, "l4")}
      </>
    );
  }
  const armY = frame === 1 ? 60 : 56;

  return (
    <div style={{ position: "relative", width: HERO_W, height: HERO_H, transform: `translateY(${bob}px)` }}>
      {legs}
      {R(6, armY, 14, 34, PAL.magDk, ol, "arm-b")}
      {R(22, 54, 68, 54, PAL.mag, ol, "body")}
      {R(44, 68, 24, 24, PAL.gold, { boxShadow: `inset 0 0 0 3px ${navy}` }, "emblem")}
      {R(50, 74, 12, 12, PAL.cyan, undefined, "core")}
      {R(22, 98, 68, 8, navy, undefined, "belt")}
      {R(92, armY + 4, 14, 30, PAL.mag, ol, "arm-f")}
      {R(16, 12, 80, 44, PAL.cyan, ol, "helmet")}
      {R(22, 16, 68, 8, PAL.cyanHi, undefined, "helm-hi")}
      {R(26, 30, 60, 20, navy, undefined, "visor-bg")}
      {R(30, 33, 42, 12, "#0a2540", undefined, "visor")}
      {R(34, 35, 8, 8, PAL.cyan, undefined, "glint1")}
      {R(58, 34, 10, 8, PAL.white, undefined, "glint2")}
    </div>
  );
}

// ── question block ──────────────────────────────────────────────────────────
function QBlock({ used, style }: { used: boolean; style?: React.CSSProperties }) {
  const body = used ? "#6b4f25" : PAL.gold;
  const hi = used ? "#8a6a35" : PAL.goldHi;
  const dk = used ? "#3d2c12" : PAL.goldDk;
  return (
    <div
      style={{
        position: "relative",
        width: 64,
        height: 64,
        background: body,
        boxShadow: `inset 0 0 0 4px ${PAL.navy}, inset 7px 7px 0 -3px ${hi}, inset -7px -7px 0 -3px ${dk}`,
        ...style,
      }}
    >
      {([
        [8, 8],
        [48, 8],
        [8, 48],
        [48, 48],
      ] as [number, number][]).map(([x, y], i) => (
        <div key={i} style={{ position: "absolute", left: x, top: y, width: 8, height: 8, background: PAL.navy }} />
      ))}
      {!used && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: PXFONT,
            fontSize: 26,
            color: PAL.navy,
            paddingBottom: 4,
          }}
        >
          ?
        </div>
      )}
    </div>
  );
}

function Sun({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: `linear-gradient(${PAL.sun1}, ${PAL.sun2} 52%, ${PAL.sun3})`,
        boxShadow: "0 0 90px 30px rgba(255,90,140,0.30)",
        ...style,
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            bottom: `${26 + i * 15}%`,
            width: "100%",
            height: `${5 + i * 3}px`,
            background: PAL.skyMid,
            opacity: 0.92,
          }}
        />
      ))}
    </div>
  );
}

function Hills({ sx }: { sx: number }) {
  const period = 780;
  const off = -((sx * 0.28) % period);
  return (
    <div style={{ position: "absolute", left: 0, bottom: 200, width: "100%", height: 260, overflow: "hidden" }}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: off + i * period,
            bottom: 0,
            width: 540,
            height: 200,
            background: PAL.hill,
            borderRadius: "50% 50% 0 0",
            boxShadow: `inset 0 7px 0 ${PAL.hillRim}`,
          }}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={"b" + i}
          style={{
            position: "absolute",
            left: off + i * period + 360,
            bottom: 0,
            width: 320,
            height: 130,
            background: PAL.hill,
            borderRadius: "50% 50% 0 0",
            boxShadow: `inset 0 6px 0 ${PAL.hillRim}`,
          }}
        />
      ))}
    </div>
  );
}

function Ground({ sx }: { sx: number }) {
  const off = -(sx % 64);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: GROUND_TOP,
        width: "100%",
        height: 1080 - GROUND_TOP,
        background: PAL.ground,
        boxShadow: `inset 0 6px 0 ${PAL.groundEdge}`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: off,
          top: 8,
          width: "200%",
          height: "100%",
          backgroundImage: `linear-gradient(90deg, ${PAL.brickLine} 2px, transparent 2px), linear-gradient(0deg, ${PAL.brickLine} 2px, transparent 2px)`,
          backgroundSize: "64px 64px",
          opacity: 0.55,
        }}
      />
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 2, background: PAL.cyanHi, opacity: 0.5 }} />
    </div>
  );
}

const STAR_POS = Array.from({ length: 46 }, (_, i) => ({
  x: (i * 137) % 1920,
  y: (i * 71) % 540,
  s: 3 + (i % 3) * 2,
  ph: i % 7,
}));
function Stars({ t }: { t: number }) {
  return (
    <>
      {STAR_POS.map((p, i) => {
        const o = 0.35 + 0.65 * Math.abs(Math.sin(t * 1.6 + p.ph));
        return <div key={i} style={{ position: "absolute", left: p.x, top: p.y, width: p.s, height: p.s, background: "#fff", opacity: o }} />;
      })}
    </>
  );
}

function FlagPole({ flagP }: { flagP: number }) {
  const poleH = 430;
  const poleTop = GROUND_TOP - poleH;
  const flagY = poleTop + (1 - flagP) * (poleH - 110);
  return (
    <div style={{ position: "absolute", left: 0, top: 0 }}>
      <div style={{ position: "absolute", left: -6, top: poleTop, width: 12, height: poleH, background: PAL.cyanDk, boxShadow: `inset 0 0 0 3px ${PAL.navy}` }} />
      <div style={{ position: "absolute", left: -16, top: poleTop - 18, width: 32, height: 18, background: PAL.gold, boxShadow: `inset 0 0 0 3px ${PAL.navy}` }} />
      <div
        style={{
          position: "absolute",
          left: 12,
          top: flagY,
          width: 88,
          height: 62,
          background: PAL.mag,
          boxShadow: `inset 0 0 0 4px ${PAL.navy}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: 24, height: 24, background: PAL.cyan }} />
      </div>
    </div>
  );
}

function Castle() {
  const brick = "#3a1d6e";
  const dark = PAL.navy;
  const door = "#0a0420";
  return (
    <div style={{ position: "absolute", left: 0, top: GROUND_TOP - 300, width: 300, height: 300 }}>
      {R(0, 90, 300, 210, brick, { boxShadow: `inset 0 0 0 4px ${dark}` }, "base")}
      {[0, 1, 2, 3, 4, 5].map((i) => R(i * 52, 60, 36, 34, brick, { boxShadow: `inset 0 0 0 4px ${dark}` }, "bt" + i))}
      {R(110, 0, 80, 110, brick, { boxShadow: `inset 0 0 0 4px ${dark}` }, "tower")}
      {[0, 1, 2].map((i) => R(110 + i * 30, -20, 20, 24, brick, { boxShadow: `inset 0 0 0 4px ${dark}` }, "tt" + i))}
      {R(120, 180, 60, 120, door, { borderRadius: "30px 30px 0 0" }, "door")}
      {R(50, 130, 30, 40, door, undefined, "w1")}
      {R(220, 130, 30, 40, door, undefined, "w2")}
      {R(135, 40, 30, 36, door, undefined, "w3")}
    </div>
  );
}

function TitleCard({ t }: { t: number }) {
  if (t > 2.7) return null;
  const inOp = animate({ from: 0, to: 1, start: 0.15, end: 0.65, ease: Easing.easeOutCubic })(t);
  const outOp = animate({ from: 0, to: 1, start: 2.05, end: 2.55, ease: Easing.easeInCubic })(t);
  const op = inOp * (1 - outOp);
  const ty = animate({ from: 26, to: 0, start: 0.15, end: 0.85, ease: Easing.easeOutBack })(t);
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none", opacity: op }}>
      <div style={{ fontFamily: PXFONT, fontSize: 18, color: PAL.gold, letterSpacing: 2, marginBottom: 26, transform: `translateY(${ty}px)`, textShadow: `3px 3px 0 ${PAL.navy}` }}>
        WORLD&nbsp;1-1
      </div>
      <div style={{ fontFamily: PXFONT, fontSize: 62, color: PAL.white, textAlign: "center", lineHeight: 1.35, transform: `translateY(${ty}px)`, textShadow: `0 0 26px ${PAL.cyan}, 5px 5px 0 ${PAL.mag}, 9px 9px 0 ${PAL.navy}` }}>
        FAROOQ&nbsp;KHAN
      </div>
      <div style={{ fontFamily: PXFONT, fontSize: 19, color: PAL.cyan, marginTop: 30, transform: `translateY(${ty}px)`, textShadow: `2px 2px 0 ${PAL.navy}` }}>
        ★ DEVOPS / CLOUD / AIOPS ★
      </div>
    </div>
  );
}

function Chip({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ fontFamily: PXFONT, fontSize: 14, color: PAL.navy, background: color, padding: "12px 14px", boxShadow: `inset 0 0 0 3px ${PAL.navy}, 4px 4px 0 ${PAL.navy}` }}>
      {label}
    </div>
  );
}

function EndCard({ t }: { t: number }) {
  if (t < 10.0) return null;
  const op = animate({ from: 0, to: 1, start: 10.05, end: 10.6, ease: Easing.easeOutCubic })(t);
  const ty = animate({ from: 24, to: 0, start: 10.2, end: 10.9, ease: Easing.easeOutBack })(t);
  const blink = Math.floor(t * 2) % 2 === 0;
  const chips: [string, string][] = [
    ["DOCKER", PAL.gold],
    ["K8S", PAL.cyan],
    ["AWS", PAL.mag],
    ["ANSIBLE", PAL.gold],
    ["GRAFANA", PAL.cyan],
    ["GITLAB CI", PAL.mag],
  ];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: op,
        background: `linear-gradient(${PAL.skyTop} 0%, ${PAL.skyMid} 55%, ${PAL.skyLow} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stars t={t} />
      <Sun style={{ left: "calc(50% - 150px)", top: 60, opacity: 0.5 }} />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", transform: `translateY(${ty}px)` }}>
        <div style={{ fontFamily: PXFONT, fontSize: 16, color: PAL.gold, letterSpacing: 2, marginBottom: 24, textShadow: `3px 3px 0 ${PAL.navy}` }}>★ LEVEL COMPLETE ★</div>
        <div style={{ fontFamily: PXFONT, fontSize: 58, color: PAL.white, textAlign: "center", lineHeight: 1.35, textShadow: `0 0 26px ${PAL.cyan}, 5px 5px 0 ${PAL.mag}, 9px 9px 0 ${PAL.navy}` }}>
          FAROOQ&nbsp;KHAN
        </div>
        <div style={{ fontFamily: PXFONT, fontSize: 18, color: PAL.cyan, marginTop: 26, textShadow: `2px 2px 0 ${PAL.navy}` }}>99.9% UPTIME / AI-DRIVEN ITOPS</div>
        <div style={{ display: "flex", gap: 16, marginTop: 42, flexWrap: "wrap", justifyContent: "center", maxWidth: 1100 }}>
          {chips.map(([l, c], i) => (
            <Chip key={i} label={l} color={c} />
          ))}
        </div>
        <div style={{ fontFamily: PXFONT, fontSize: 20, color: PAL.white, marginTop: 54, opacity: blink ? 1 : 0.15, textShadow: `3px 3px 0 ${PAL.navy}` }}>▶ PRESS START</div>
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px)",
        boxShadow: "inset 0 0 220px 40px rgba(10,2,30,0.65)",
      }}
    />
  );
}

function Level({ t }: { t: number }) {
  const sx = scrollX(t);
  const jy = jumpOffset(t);
  const running = t > 2.2 && t < 9.1;
  const jumping = jy < -6;
  const heroTop = GROUND_TOP - HERO_H + jy;
  const worldFade = animate({ from: 0, to: 1, start: 0, end: 0.5, ease: Easing.easeOutQuad })(t);
  const camScale = interpolate([0, 2.4, 8.3, 9.2, 12], [1.06, 1.0, 1.0, 1.13, 1.13], Easing.easeInOutCubic)(t);
  const flagP = animate({ from: 0.1, to: 1, start: 8.8, end: 9.7, ease: Easing.easeOutCubic })(t);
  const flagScreen = FLAG_WORLD - sx;
  const castleScreen = CASTLE_WORLD - sx;
  const clear = t > 8.9 && t < 10.2;
  const clearTy = animate({ from: 30, to: 0, start: 8.9, end: 9.5, ease: Easing.easeOutBack })(t);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${PAL.skyTop} 0%, ${PAL.skyMid} 45%, ${PAL.skyLow} 78%, ${PAL.skyGlow} 100%)` }} />

      <div style={{ position: "absolute", inset: 0, opacity: worldFade, transform: `scale(${camScale})`, transformOrigin: "520px 720px" }}>
        <Stars t={t} />
        <Sun style={{ left: 740, top: 120 }} />
        <Hills sx={sx} />
        <Ground sx={sx} />

        {FLOAT.map((c, i) => {
          const cx = c.worldX - sx;
          if (cx < HERO_X - 30 || cx > 2000) return null;
          const near = cx < HERO_X + 60;
          const pop = near ? clamp((HERO_X + 60 - cx) / 60, 0, 1) : 0;
          return (
            <div key={i} style={{ position: "absolute", left: cx, top: c.y + Math.sin(t * 4 + i) * 5, opacity: 1 - pop, transform: `scale(${1 + pop * 0.7})` }}>
              <Coin px={4} phase={t * 10 + i} />
            </div>
          );
        })}

        <div style={{ position: "absolute", left: castleScreen, top: 0 }}>
          <Castle />
        </div>
        <div style={{ position: "absolute", left: flagScreen, top: 0 }}>
          <FlagPole flagP={flagP} />
        </div>

        {BLOCKS.map((b, i) => {
          const bx = b.worldX - sx;
          if (bx < -120 || bx > 2050) return null;
          const used = t >= b.hit;
          const bounce = t >= b.hit && t < b.hit + 0.2 ? -14 * Math.sin(Math.PI * ((t - b.hit) / 0.2)) : 0;
          let coin: React.ReactNode = null;
          if (t >= b.hit && t < b.hit + 1.3) {
            const l = t - b.hit;
            const rise = Easing.easeOutQuad(clamp(l / 0.7, 0, 1));
            const cy = b.top - 40 - rise * 150;
            const cop = l < 0.7 ? 1 : clamp(1 - (l - 0.7) / 0.55, 0, 1);
            coin = (
              <>
                <div style={{ position: "absolute", left: bx + 18, top: cy, opacity: cop }}>
                  <Coin px={4} phase={l * 16} />
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: bx - 44,
                    top: cy - 46,
                    width: 152,
                    textAlign: "center",
                    opacity: cop,
                    fontFamily: PXFONT,
                    fontSize: 15,
                    color: PAL.cyan,
                    textShadow: `0 0 10px ${PAL.cyan}, 2px 2px 0 ${PAL.navy}`,
                  }}
                >
                  {b.label}
                </div>
              </>
            );
          }
          return (
            <div key={i}>
              <QBlock used={used} style={{ position: "absolute", left: bx, top: b.top + bounce }} />
              {coin}
            </div>
          );
        })}

        <div style={{ position: "absolute", left: HERO_X, top: heroTop }}>
          <HeroSprite t={t} running={running} jumping={jumping} />
        </div>

        {clear && (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 300,
              textAlign: "center",
              transform: `translateY(${clearTy}px)`,
              fontFamily: PXFONT,
              fontSize: 46,
              color: PAL.gold,
              textShadow: `0 0 22px ${PAL.gold}, 5px 5px 0 ${PAL.navy}`,
            }}
          >
            LEVEL&nbsp;CLEAR!
          </div>
        )}
      </div>

      <TitleCard t={t} />
      <EndCard t={t} />
      <Overlay />
    </div>
  );
}

// ── public component ─────────────────────────────────────────────────────────
export default function GameIntro({ onComplete }: { onComplete: () => void }) {
  const [time, setTime] = useState(0);
  const [scale, setScale] = useState(1);
  const [fading, setFading] = useState(false);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setFading(true);
    setTimeout(onComplete, 450);
  }, [onComplete]);

  // Load the pixel font once.
  useEffect(() => {
    const id = "press-start-2p-font";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  // Fit the 1920×1080 stage to the viewport.
  useEffect(() => {
    const measure = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Drive the timeline.
  useEffect(() => {
    let raf = 0;
    let last: number | null = null;
    const step = (ts: number) => {
      if (last == null) last = ts;
      const dt = (ts - last) / 1000;
      last = ts;
      setTime((t) => Math.min(t + dt, DURATION));
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Auto-reveal the site shortly after the end card settles.
  useEffect(() => {
    if (time >= DURATION) finish();
  }, [time, finish]);

  // Let the visitor skip with any key.
  useEffect(() => {
    const onKey = () => finish();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finish]);

  const canPress = time >= 10.6;

  return (
    <div
      onClick={canPress ? finish : undefined}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "#0a061c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        cursor: canPress ? "pointer" : "default",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.45s ease",
      }}
    >
      <div
        style={{
          width: 1920,
          height: 1080,
          position: "relative",
          flexShrink: 0,
          transform: `scale(${scale})`,
          transformOrigin: "center",
          overflow: "hidden",
        }}
      >
        <Level t={time} />
      </div>

      {/* Skip button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          finish();
        }}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 60,
          fontFamily: PXFONT,
          fontSize: 11,
          color: PAL.white,
          background: "rgba(21,12,44,0.7)",
          border: `2px solid ${PAL.cyan}`,
          padding: "10px 14px",
          cursor: "pointer",
          letterSpacing: 1,
        }}
      >
        SKIP ▶
      </button>
    </div>
  );
}
