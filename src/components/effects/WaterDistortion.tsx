"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ANIMATION_CONFIG } from "@/lib/gsap";

export default function WaterDistortion() {
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const turb = turbulenceRef.current;
    if (!turb) return;

    // Gentle watercolor ink turbulence animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(turb, {
      duration: ANIMATION_CONFIG.waterDistortion.duration,
      attr: { baseFrequency: ANIMATION_CONFIG.waterDistortion.freqA },
      ease: ANIMATION_CONFIG.waterDistortion.ease,
    }).to(turb, {
      duration: ANIMATION_CONFIG.waterDistortion.duration,
      attr: { baseFrequency: ANIMATION_CONFIG.waterDistortion.freqB },
      ease: ANIMATION_CONFIG.waterDistortion.ease,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <svg aria-hidden="true" className="fixed w-0 h-0 pointer-events-none opacity-0">
      <defs>
        <filter id="water-ripple-filter" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency="0.01 0.02"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
