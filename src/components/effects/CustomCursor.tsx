"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ANIMATION_CONFIG } from "@/lib/gsap";

export default function CustomCursor() {
  const followerRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Check if fine hover pointer is supported (desktop)
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    setIsEnabled(true);

    const follower = followerRef.current;
    const ripple = rippleRef.current;
    if (!follower || !ripple) return;

    // GSAP quickTo for smooth liquid-lag tracking behind the standard cursor
    const setFollowerX = gsap.quickTo(follower, "x", { duration: ANIMATION_CONFIG.cursor.followerDuration, ease: ANIMATION_CONFIG.cursor.followerEase });
    const setFollowerY = gsap.quickTo(follower, "y", { duration: ANIMATION_CONFIG.cursor.followerDuration, ease: ANIMATION_CONFIG.cursor.followerEase });

    const setRippleX = gsap.quickTo(ripple, "x", { duration: ANIMATION_CONFIG.cursor.rippleDuration, ease: ANIMATION_CONFIG.cursor.rippleEase });
    const setRippleY = gsap.quickTo(ripple, "y", { duration: ANIMATION_CONFIG.cursor.rippleDuration, ease: ANIMATION_CONFIG.cursor.rippleEase });

    const onMouseMove = (e: MouseEvent) => {
      setFollowerX(e.clientX);
      setFollowerY(e.clientY);
      setRippleX(e.clientX);
      setRippleY(e.clientY);
    };

    // Hover interaction over objects: morphs like water / expands smoothly
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], .interactive-hover, h1, h2, .hanko-seal");

      if (isInteractive) {
        gsap.to(follower, {
          scale: ANIMATION_CONFIG.cursor.hoverScale,
          borderColor: "rgba(184, 76, 61, 0.85)",
          backgroundColor: "rgba(184, 76, 61, 0.1)",
          boxShadow: "0 0 30px rgba(184, 76, 61, 0.28), inset 0 0 14px rgba(184, 76, 61, 0.2)",
          duration: ANIMATION_CONFIG.cursor.hoverDuration,
          ease: "back.out(1.7)",
        });

        gsap.to(ripple, {
          scale: 1.5,
          opacity: 0.95,
          borderColor: "rgba(217, 166, 110, 0.8)",
          duration: ANIMATION_CONFIG.cursor.hoverDuration,
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], .interactive-hover, h1, h2, .hanko-seal");

      if (isInteractive) {
        gsap.to(follower, {
          scale: 1,
          borderColor: "rgba(184, 76, 61, 0.5)",
          backgroundColor: "transparent",
          boxShadow: "0 0 12px rgba(184, 76, 61, 0.1)",
          duration: ANIMATION_CONFIG.cursor.hoverDuration,
          ease: "power2.out",
        });

        gsap.to(ripple, {
          scale: 1,
          opacity: 0.45,
          borderColor: "rgba(113, 138, 138, 0.45)",
          duration: ANIMATION_CONFIG.cursor.hoverDuration,
        });
      }
    };

    // Water ripple pulse on click
    const handleMouseDown = () => {
      gsap.fromTo(
        follower,
        { scale: 0.85 },
        { scale: ANIMATION_CONFIG.cursor.clickScale, opacity: 0.15, duration: ANIMATION_CONFIG.cursor.clickDuration, ease: "power2.out" }
      );
    };

    const handleMouseUp = () => {
      gsap.to(follower, { scale: 1, opacity: 1, duration: ANIMATION_CONFIG.cursor.hoverDuration, ease: "back.out(2.2)" });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <>
      {/* Outer Water Ripple Ring following cursor with smooth lag */}
      <div
        ref={followerRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-9 h-9 -ml-[18px] -mt-[18px] border border-vermilion-500/45 rounded-full pointer-events-none z-[9999] transition-transform duration-75 ease-out shadow-[0_0_12px_rgba(184,76,61,0.12)]"
        style={{ willChange: "transform" }}
      />
      {/* Inner subtle concentric water circle */}
      <div
        ref={rippleRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-3 h-3 -ml-[6px] -mt-[6px] border border-water-500/40 rounded-full pointer-events-none z-[9999] opacity-40 transition-transform duration-75"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
