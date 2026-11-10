"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface KoiFishDistortionProps {
  className?: string;
}

/**
 * Swimming Koi Fish Shadow Animation
 * Subtle underwater silhouette swimming across the river scroll canvas
 * at intervals with organic sinusoidal tail fin motion.
 */
export default function KoiFishDistortion({ className = "" }: KoiFishDistortionProps) {
  const koiRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const koi = koiRef.current;
    if (!koi) return;

    // Swim cycle path: enters from lower right, glides across to middle left
    const swimTl = gsap.timeline({ repeat: -1, repeatDelay: 12 });

    swimTl
      .set(koi, { x: "-20vw", y: "85vh", opacity: 0, rotate: -25, scale: 0.85 })
      .to(koi, {
        opacity: 0.35,
        duration: 3,
        ease: "power1.in",
      })
      .to(
        koi,
        {
          x: "115vw",
          y: "35vh",
          duration: 22,
          ease: "none",
        },
        0
      )
      .to(
        koi,
        {
          rotate: "+=12",
          duration: 2.5,
          yoyo: true,
          repeat: 8,
          ease: "sine.inOut",
        },
        0
      )
      .to(
        koi,
        {
          opacity: 0,
          duration: 4,
          ease: "power2.out",
        },
        18
      );

    return () => {
      swimTl.kill();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none select-none z-[8] overflow-hidden ${className}`}
    >
      <svg
        ref={koiRef}
        viewBox="0 0 160 60"
        className="absolute w-36 sm:w-48 h-auto mix-blend-multiply opacity-0 blur-[1.5px]"
        fill="none"
      >
        {/* Soft watercolor Koi shadow */}
        <path
          d="M10 30 C30 18 80 12 120 22 C135 25 150 20 155 30 C150 40 135 35 120 38 C80 48 30 42 10 30 Z"
          fill="rgba(75, 80, 71, 0.45)"
        />
        {/* Vermilion crown patch */}
        <ellipse cx="115" cy="28" rx="8" ry="4" fill="rgba(184, 76, 61, 0.55)" />
        {/* Fins */}
        <path
          d="M85 20 C95 8 110 5 112 18 Z"
          fill="rgba(75, 80, 71, 0.3)"
        />
        <path
          d="M85 40 C95 52 110 55 112 42 Z"
          fill="rgba(75, 80, 71, 0.3)"
        />
        {/* Flowing Tail fin */}
        <path
          d="M10 30 C-5 15 -12 25 -2 30 C-12 35 -5 45 10 30 Z"
          fill="rgba(75, 80, 71, 0.35)"
        />
      </svg>
    </div>
  );
}

