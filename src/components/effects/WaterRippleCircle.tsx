"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";

interface WaterRippleCircleProps {
  target: HTMLElement | null;
  trigger: "hover" | "click" | null;
}

/**
 * Water Ripple Circle Effect
 * When the user hovers over or clicks on interactive elements,
 * a water-like rippling circle appears at that position.
 */
export default function WaterRippleCircle({ target, trigger }: WaterRippleCircleProps) {
  const ripplesRef = useRef<HTMLDivElement>(null!);

  // Initialize ripples container
  useEffect(() => {
    const container = document.createElement("div");
    container.className = "water-ripples absolute inset-0 pointer-events-none z-[9998] overflow-hidden";
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9998;
    `;
    document.body.appendChild(container);

    ripplesRef.current = container;

    return () => {
      container.remove();
    };
  }, []);

  // Create ripple effect on target
  useCallback(() => {
    if (!target || !trigger) return;

    const rect = target.getBoundingClientRect();
    const midX = rect.left + rect.width / 2;
    const midY = rect.top + rect.height / 2;
    const radius = Math.max(rect.width, rect.height) * 0.8;

    // Create ripple circle
    const ripple = document.createElement("div");
    ripple.className = "water-ripple absolute rounded-full pointer-events-none";
    ripple.style.cssText = `
      width: 0;
      height: 0;
      border: 2px solid rgba(184, 76, 61, 0.15);
      border-radius: 50%;
      opacity: 0.7;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 10px rgba(184, 76, 61, 0.08);
    `;
    ripplesRef.current.appendChild(ripple);
    (window as any).__ripples = (window as any).__ripples || [];
    (window as any).__ripples.push(ripple);

    // GSAP animation: water-like ripple effect
    const tl = gsap.timeline({
      onComplete: () => {
        ripple.remove();
      },
    });

    tl.to(ripple, {
      width: radius * 2,
      height: radius * 2,
      duration: 0.8,
      ease: "power2.out",
    }).to(ripple, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    }).to(ripple, {
      scale: 2.5,
      duration: 0.8,
      ease: "none",
    });

  }, [target, trigger]);

  // Event listeners
  useEffect(() => {
    if (trigger === "click" && target) {
      target.addEventListener("click", () => {
        // Trigger ripple on click
      });
    }

    if (trigger === "hover" && target) {
      target.addEventListener("mouseenter", () => {
        // Trigger hover ripple
      });
    }

    return () => {
      if (target) {
        target.removeEventListener("click", () => {});
        target.removeEventListener("mouseenter", () => {});
      }
    };
  }, [target, trigger]);

  // Store ripple effect function
  useEffect(() => {
    const triggerRipple = () => {
      if (target && trigger) {
        // Create ripple effect
        const rect = target.getBoundingClientRect();
        const midX = rect.left + rect.width / 2;
        const midY = rect.top + rect.height / 2;
        const radius = Math.max(rect.width, rect.height) * 0.8;

        const ripple = document.createElement("div");
        ripple.className = "water-ripple absolute rounded-full pointer-events-none";
        ripple.style.cssText = `
          width: 0;
          height: 0;
          border: 2px solid rgba(184, 76, 61, 0.15);
          border-radius: 50%;
          opacity: 0.7;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px rgba(184, 76, 61, 0.08);
        `;
        ripplesRef.current.appendChild(ripple);
        (window as any).__ripples = (window as any).__ripples || [];
        (window as any).__ripples.push(ripple);

        gsap.timeline({
          onComplete: () => {
            ripple.remove();
          },
        }).to(ripple, {
          width: radius * 2,
          height: radius * 2,
          duration: 0.8,
          ease: "power2.out",
        }).to(ripple, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        }).to(ripple, {
          scale: 2.5,
          duration: 0.8,
          ease: "none",
        });
      }
    };

    // Store the function for later use
    (window as any).__triggerRipple = triggerRipple;

    return () => {
      delete (window as any).__triggerRipple;
    };
  }, [target, trigger]);

  useEffect(() => {
    // This is called on mount to set up the ripple function
  }, []);

  return null;
}