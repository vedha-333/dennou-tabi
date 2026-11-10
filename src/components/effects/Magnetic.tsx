"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
  className?: string;
}

/**
 * Japanese Zen Magnetic Physics
 * Gently pulls interactive items (Hanko seals, primary CTAs, GitHub badge)
 * toward the cursor with spring dampening and a liquid release.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: MagneticProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    const el = elRef.current;
    if (!el) return;

    const setX = gsap.quickTo(el, "x", { duration: 0.45, ease: "power2.out" });
    const setY = gsap.quickTo(el, "y", { duration: 0.45, ease: "power2.out" });
    const setRot = gsap.quickTo(el, "rotate", { duration: 0.5, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);
      const maxDistance = Math.max(rect.width, rect.height) * 1.5;

      if (distance < maxDistance) {
        const pull = (1 - distance / maxDistance) * strength;
        setX(distanceX * pull);
        setY(distanceY * pull);
        setRot(distanceX * 0.05);
      } else {
        setX(0);
        setY(0);
        setRot(0);
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        rotate: 0,
        duration: 0.8,
        ease: "elastic.out(1.1, 0.4)",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={elRef} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
}

