"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface InkWashRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Editorial Japanese Ink Wash Reveal
 * Uses GSAP to expand a masked radial ink-bleed with subtle blur settling
 * when the element scrolls into view.
 */
export default function InkWashReveal({
  children,
  className = "",
  delay = 0,
}: InkWashRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Initial state: masked out with blur & slight drop
    gsap.set(el, {
      opacity: 0,
      y: 24,
      filter: "blur(8px)",
      clipPath: "inset(0% 0% 100% 0% round 12px)",
    });

    const trigger = gsap.to(el, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      clipPath: "inset(0% 0% 0% 0% round 12px)",
      duration: 1.2,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      trigger.scrollTrigger?.kill();
      trigger.kill();
    };
  }, [delay]);

  return (
    <div ref={containerRef} className={`will-change-[transform,opacity,clip-path] ${className}`}>
      {children}
    </div>
  );
}

