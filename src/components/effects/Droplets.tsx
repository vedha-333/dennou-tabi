"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Rain on a car window — seen from inside.
 *
 * Three depth layers:
 *   Layer 1 — Large "cling" drops (close to glass):
 *              25–55px, almost circular, gravity-flattened base, very slow or jerky.
 *   Layer 2 — Medium sliding drops:
 *              Elongated teardrop, round head at bottom, thin tail at top.
 *              Some pause mid-fall then accelerate (surface tension releasing).
 *   Layer 3 — Tiny background dots:
 *              2–7px, faster, more transparent (further from glass).
 */

// ─────────────────────────────────────────────────────────────────────────────
// SVG SHAPE GENERATORS
// ─────────────────────────────────────────────────────────────────────────────

/** Large circular cling-drop: wide, gravity-flattened oval, glass-lens look */
function clingDropSVG(id: string, s: number): string {
  const cx = s / 2;
  const cy = s * 0.44;
  return `<svg viewBox="0 0 ${s} ${s * 0.9}" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <defs>
      <radialGradient id="cg${id}" cx="40%" cy="35%" r="58%">
        <stop offset="0%"   stop-color="rgba(255,255,255,0.07)"/>
        <stop offset="45%"  stop-color="rgba(230,240,245,0.04)"/>
        <stop offset="80%"  stop-color="rgba(195,215,222,0.14)"/>
        <stop offset="100%" stop-color="rgba(165,190,200,0.26)"/>
      </radialGradient>
      <radialGradient id="ch${id}" cx="30%" cy="26%" r="34%">
        <stop offset="0%"   stop-color="rgba(255,255,255,0.88)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
      </radialGradient>
    </defs>
    <!-- Main body -->
    <ellipse cx="${cx}" cy="${cy}" rx="${cx - 1}" ry="${cy - 1}"
      fill="url(#cg${id})" stroke="rgba(255,255,255,0.40)" stroke-width="0.9"/>
    <!-- Top-left bright refraction spot -->
    <ellipse cx="${s * 0.32}" cy="${s * 0.26}" rx="${s * 0.17}" ry="${s * 0.13}"
      fill="url(#ch${id})"/>
    <!-- Bottom rim glow where drop meets glass -->
    <ellipse cx="${cx}" cy="${s * 0.80}" rx="${s * 0.28}" ry="${s * 0.055}"
      fill="rgba(255,255,255,0.32)"/>
    <!-- Soft outer shadow ring -->
    <ellipse cx="${cx}" cy="${cy}" rx="${cx - 0.5}" ry="${cy - 0.5}"
      fill="none" stroke="rgba(90,115,128,0.16)" stroke-width="1.6"/>
  </svg>`;
}

/**
 * Sliding raindrop teardrop:
 * Drop travels downward → bottom is the "head" (round bulge)
 * and top tapers to a thin point (the trailing tail).
 */
function slideDropSVG(id: string, w: number, h: number): string {
  return `<svg viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <defs>
      <linearGradient id="sg${id}" x1="0" y1="0" x2="${w}" y2="${h}" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stop-color="rgba(255,255,255,0.72)"/>
        <stop offset="18%"  stop-color="rgba(242,250,254,0.22)"/>
        <stop offset="62%"  stop-color="rgba(195,218,228,0.11)"/>
        <stop offset="88%"  stop-color="rgba(220,236,242,0.20)"/>
        <stop offset="100%" stop-color="rgba(242,250,254,0.30)"/>
      </linearGradient>
      <radialGradient id="sh${id}" cx="38%" cy="80%" r="28%">
        <stop offset="0%"   stop-color="rgba(255,255,255,0.72)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
      </radialGradient>
    </defs>
    <!-- Teardrop body: thin pointed tail at top, round head at bottom -->
    <path d="M${w / 2} 1.5
      C${w * 0.46} 1.5 ${w * 0.3} ${h * 0.16} ${w * 0.18} ${h * 0.4}
      C${w * 0.09} ${h * 0.6} ${w * 0.07} ${h * 0.76} ${w / 2} ${h - 1}
      C${w * 0.93} ${h * 0.76} ${w * 0.91} ${h * 0.6} ${w * 0.82} ${h * 0.4}
      C${w * 0.7} ${h * 0.16} ${w * 0.54} 1.5 ${w / 2} 1.5Z"
      fill="url(#sg${id})" stroke="rgba(255,255,255,0.52)" stroke-width="0.7"/>
    <!-- Round head highlight (bottom) -->
    <ellipse cx="${w * 0.37}" cy="${h * 0.79}" rx="${w * 0.14}" ry="${h * 0.085}"
      fill="url(#sh${id})"/>
    <!-- Thin tail highlight -->
    <line x1="${w / 2}" y1="2.5" x2="${w / 2}" y2="${h * 0.2}"
      stroke="rgba(255,255,255,0.72)" stroke-width="0.75" stroke-linecap="round" opacity="0.6"/>
  </svg>`;
}

/** Tiny distant dot — small, nearly circular */
function dotDropSVG(id: string, s: number): string {
  return `<svg viewBox="0 0 ${s} ${s}" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <defs>
      <radialGradient id="dg${id}" cx="36%" cy="30%" r="60%">
        <stop offset="0%"   stop-color="rgba(255,255,255,0.82)"/>
        <stop offset="52%"  stop-color="rgba(218,232,238,0.32)"/>
        <stop offset="100%" stop-color="rgba(175,202,212,0.18)"/>
      </radialGradient>
    </defs>
    <circle cx="${s / 2}" cy="${s / 2}" r="${s / 2 - 0.5}"
      fill="url(#dg${id})" stroke="rgba(255,255,255,0.46)" stroke-width="0.55"/>
  </svg>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Droplets() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const container = containerRef.current;
    if (!container) return;

    const nodes: HTMLDivElement[] = [];

    function spawn(
      innerHTML: string,
      left: number,
      startY: number,
      w: number,
      h: number,
      opacity: number
    ): HTMLDivElement {
      const el = document.createElement("div");
      el.className = "absolute pointer-events-none select-none";
      el.style.left = `${left}%`;
      el.style.top = `${startY}vh`;
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      el.style.opacity = `${opacity}`;
      el.innerHTML = innerHTML;
      if (container) container.appendChild(el);
      nodes.push(el);
      return el;
    }

    // ── LAYER 1: LARGE CLING DROPS ────────────────────────────────────────
    const clingCount = isMobile ? 5 : 11;
    for (let i = 0; i < clingCount; i++) {
      const s = Math.random() * 32 + 24; // 24–56px
      const left = Math.random() * 90 + 3;
      const startY = Math.random() * 100 - 5;
      const opacity = Math.random() * 0.28 + 0.42; // 0.42–0.70
      const el = spawn(clingDropSVG(`c${i}`, s), left, startY, s, s * 0.9, opacity);

      const r = Math.random();

      if (r < 0.28) {
        // STUCK: barely moves, slow oscillation only
        gsap.to(el, {
          y: `+=${Math.random() * 18 + 6}`,
          scaleX: 1.07,
          scaleY: 0.93,
          duration: Math.random() * 9 + 7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      } else if (r < 0.65) {
        // VERY SLOW SLIDE: 50–70 seconds full descent
        const dur = Math.random() * 20 + 50;
        const rem = (118 - startY) / 128;
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(el, { top: "118vh", duration: rem * dur, ease: "none" });
        tl.set(el, { top: "-65px" });
        tl.to(el, { top: "118vh", duration: dur, ease: "none" });
      } else {
        // JERK SLIDE: Pause → sudden lurch → pause → lurch ...
        const steps = Math.floor(Math.random() * 3) + 2;
        const tl = gsap.timeline({ repeat: -1 });
        for (let step = 0; step < steps; step++) {
          tl.to(el, { duration: Math.random() * 7 + 3 }); // pause
          tl.to(el, {
            top: `+=${Math.random() * 18 + 8}vh`,
            scaleY: 0.86,
            scaleX: 1.12,
            duration: Math.random() * 1.2 + 0.6,
            ease: "power2.in",
          });
          tl.to(el, { scaleY: 1, scaleX: 1, duration: 0.45, ease: "back.out(1.6)" });
        }
        tl.to(el, { top: "118vh", duration: Math.random() * 3 + 2, ease: "power1.in" });
        tl.set(el, { top: "-65px" });
      }
    }

    // ── LAYER 2: MEDIUM SLIDING DROPS ────────────────────────────────────
    const medCount = isMobile ? 15 : 30;
    for (let i = 0; i < medCount; i++) {
      const w = Math.random() * 11 + 5;         // 5–16px wide
      const h = w * (Math.random() * 2.2 + 2.4); // 2.4–4.6× taller
      const left = Math.random() * 95 + 1.5;
      const startY = Math.random() * 120 - 10;
      const opacity = Math.random() * 0.35 + 0.38;
      const el = spawn(slideDropSVG(`m${i}`, w, h), left, startY, w, h, opacity);

      const dur = Math.random() * 16 + 18; // 18–34s
      const sway = Math.random() * 14 - 7;
      const rem = (118 - startY) / 128;
      const tl = gsap.timeline({ repeat: -1 });

      if (Math.random() < 0.38) {
        // Mid-slide surface tension pause
        const fraction = Math.random() * 0.35 + 0.28; // pause 28–63% of the way down
        const pauseAtY = startY + (118 - startY) * fraction;
        tl.to(el, { top: `${pauseAtY}vh`, x: sway * 0.4, duration: rem * dur * fraction * 1.4, ease: "none" });
        tl.to(el, { duration: Math.random() * 3.5 + 1 }); // stuck
        tl.to(el, {
          top: "118vh",
          x: sway,
          duration: rem * dur * (1 - fraction) * 1.1,
          ease: "power1.in", // accelerates after releasing
        });
      } else {
        tl.to(el, { top: "118vh", x: sway, duration: rem * dur, ease: "none" });
      }
      tl.set(el, { top: "-90px", x: 0 });
      tl.to(el, { top: "118vh", x: sway, duration: dur, ease: "none" });
    }

    // ── LAYER 3: TINY DISTANT DOTS ────────────────────────────────────────
    const dotCount = isMobile ? 12 : 22;
    for (let i = 0; i < dotCount; i++) {
      const s = Math.random() * 5 + 2; // 2–7px
      const left = Math.random() * 97 + 1;
      const startY = Math.random() * 120 - 10;
      const opacity = Math.random() * 0.28 + 0.22; // subtle — further from glass
      const el = spawn(dotDropSVG(`d${i}`, s), left, startY, s, s, opacity);

      const dur = Math.random() * 9 + 8; // 8–17s (faster)
      const sway = Math.random() * 5 - 2.5;
      const rem = (118 - startY) / 128;
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(el, { top: "118vh", x: sway, duration: rem * dur, ease: "none" });
      tl.set(el, { top: "-18px", x: 0 });
      tl.to(el, { top: "118vh", x: sway, duration: dur, ease: "none" });
    }

    return () => {
      nodes.forEach((n) => {
        gsap.killTweensOf(n);
        n.remove();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-20"
    />
  );
}
