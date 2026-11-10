"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function InteractiveRedCircle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const ripple1Ref = useRef<HTMLDivElement>(null);
  const ripple2Ref = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    const container = containerRef.current;
    const circle = circleRef.current;
    const ripple1 = ripple1Ref.current;
    const ripple2 = ripple2Ref.current;
    if (!container || !circle || !ripple1 || !ripple2) return;

    // Smooth physics quickTo setters
    const setCircleX = gsap.quickTo(circle, "x", { duration: 0.45, ease: "power2.out" });
    const setCircleY = gsap.quickTo(circle, "y", { duration: 0.45, ease: "power2.out" });

    // Water ripple lag setters (slightly delayed for fluid liquid trail)
    const setRipple1X = gsap.quickTo(ripple1, "x", { duration: 0.65, ease: "power1.out" });
    const setRipple1Y = gsap.quickTo(ripple1, "y", { duration: 0.65, ease: "power1.out" });

    const setRipple2X = gsap.quickTo(ripple2, "x", { duration: 0.85, ease: "power1.out" });
    const setRipple2Y = gsap.quickTo(ripple2, "y", { duration: 0.85, ease: "power1.out" });

    // Hover mouse tracking strictly confined to this circle area
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      // Detection radius around the red circle (~130px)
      const maxRadius = rect.width * 0.9;

      if (distance < maxRadius) {
        setIsHovered(true);

        // Magnetic pull offset (+/- 28px)
        const intensity = 1 - distance / maxRadius;
        const offsetX = distX * 0.35 * intensity;
        const offsetY = distY * 0.35 * intensity;

        setCircleX(offsetX);
        setCircleY(offsetY);

        // Water ripples trail slightly with extra fluid displacement
        setRipple1X(offsetX * 1.3);
        setRipple1Y(offsetY * 1.3);

        setRipple2X(offsetX * 1.6);
        setRipple2Y(offsetY * 1.6);

        // Organic water wobble
        const wobbleFactor = (Date.now() * 0.003) % (Math.PI * 2);
        const r1 = 50 + Math.sin(wobbleFactor) * 4;
        const r2 = 50 - Math.sin(wobbleFactor) * 4;
        circle.style.borderRadius = `${r1}% ${r2}% ${r2}% ${r1}% / ${r2}% ${r1}% ${r1}% ${r2}%`;
      } else {
        if (isHovered) {
          setIsHovered(false);
          // Spring back gracefully to center
          gsap.to(circle, {
            x: 0,
            y: 0,
            borderRadius: "50%",
            duration: 1.2,
            ease: "elastic.out(1, 0.4)",
          });
          gsap.to([ripple1, ripple2], {
            x: 0,
            y: 0,
            duration: 1.4,
            ease: "elastic.out(1, 0.4)",
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className="fixed top-8 sm:top-12 md:top-14 right-6 sm:right-16 md:right-28 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 z-20 pointer-events-auto cursor-pointer select-none"
    >
      {/* 1. Outermost Water Ripple Ring (animates when hovered) */}
      <div
        ref={ripple2Ref}
        className={`absolute -inset-6 rounded-full border border-vermilion-500/30 transition-opacity duration-500 pointer-events-none ${
          isHovered ? "opacity-80 scale-110 animate-ping" : "opacity-0 scale-95"
        }`}
        style={{ animationDuration: "3s" }}
      />

      {/* 2. Middle Water Ripple Ring with fluid liquid glow */}
      <div
        ref={ripple1Ref}
        className={`absolute -inset-3 rounded-full border border-vermilion-500/50 bg-vermilion-500/5 shadow-[0_0_25px_rgba(184,76,61,0.25)] transition-all duration-300 pointer-events-none ${
          isHovered ? "opacity-100 scale-105" : "opacity-0 scale-90"
        }`}
      />

      {/* 3. Soft Ambient Sun Halo Bloom */}
      <div
        ref={haloRef}
        className={`absolute inset-0 rounded-full blur-2xl bg-vermilion-500/35 transition-transform duration-500 pointer-events-none ${
          isHovered ? "scale-135 opacity-90" : "scale-115 opacity-60"
        }`}
      />

      {/* 4. The Vermilion Red Sun Circle (Moves magnetically with water-wobble on hover) */}
      <div
        ref={circleRef}
        className="relative w-full h-full rounded-full shadow-[0_10px_35px_rgba(184,76,61,0.45)] transition-shadow duration-300 will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 45% 45%, #C25142 0%, #B84C3D 60%, #943527 100%)",
          backgroundImage:
            "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 2px, transparent 3px, transparent 8px), radial-gradient(circle at 45% 45%, #C25142 0%, #B84C3D 60%, #943527 100%)",
        }}
      >
        {/* Subtle inner paper grain overlay */}
        <div className="absolute inset-0 rounded-full mix-blend-overlay bg-parchment-100/10 pointer-events-none" />

        {/* Gentle water shimmer highlight when hovering */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/15 to-transparent transition-opacity duration-300 pointer-events-none ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}

