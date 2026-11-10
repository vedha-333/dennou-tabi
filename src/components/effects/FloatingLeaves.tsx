"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ANIMATION_CONFIG } from "@/lib/gsap";

export default function FloatingLeaves() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? ANIMATION_CONFIG.leaves.mobileCount : ANIMATION_CONFIG.leaves.desktopCount;
    const container = containerRef.current;
    if (!container) return;

    const petals: HTMLDivElement[] = [];

    // Create SVG sakura petal shapes
    for (let i = 0; i < count; i++) {
      const petal = document.createElement("div");
      const left = Math.random() * 105 - 5;
      const size = Math.random() * 12 + 10;
      const opacity = Math.random() * 0.4 + 0.35;

      petal.className = "absolute pointer-events-none";
      petal.style.left = `${left}%`;
      petal.style.top = "-50px";
      petal.style.width = `${size}px`;
      petal.style.height = `${size * 1.3}px`;
      petal.style.opacity = `${opacity}`;

      petal.innerHTML = `
        <svg viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full drop-shadow-sm">
          <path d="M15 0 C25 10 32 25 15 38 C-2 25 5 10 15 0 Z" fill="url(#petal-grad-${i})" />
          <defs>
            <linearGradient id="petal-grad-${i}" x1="0" y1="0" x2="30" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#FCE7D8" stop-opacity="0.9"/>
              <stop offset="60%" stop-color="#EAA6A0" stop-opacity="0.75"/>
              <stop offset="100%" stop-color="#B84C3D" stop-opacity="0.85"/>
            </linearGradient>
          </defs>
        </svg>
      `;

      container.appendChild(petal);
      petals.push(petal);

      const duration = Math.random() * (ANIMATION_CONFIG.leaves.maxDuration - ANIMATION_CONFIG.leaves.minDuration) + ANIMATION_CONFIG.leaves.minDuration;
      const delay = Math.random() * ANIMATION_CONFIG.leaves.maxDelay;

      // Compound GSAP animation for 3D tumbling and drifting
      gsap.to(petal, {
        y: "110vh",
        x: `+=${Math.random() * 140 - 50}`,
        rotation: Math.random() * 900 - 450,
        rotationX: Math.random() * 420,
        rotationY: Math.random() * 420,
        duration: duration,
        delay: delay,
        repeat: -1,
        ease: "none",
      });
    }

    return () => {
      petals.forEach((el) => {
        gsap.killTweensOf(el);
        el.remove();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-20"
      style={{ perspective: "600px" }}
    />
  );
}

