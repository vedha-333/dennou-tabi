import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Centralized animation tuning constants
export const ANIMATION_CONFIG = {
  // Scroll-triggered scene transitions
  scroll: {
    scrub: 0.4,              // lower = tighter to scroll, higher = more smoothing
    ease: "power1.inOut",
    start: "top 85%",        // when the reveal begins
    end: "top 25%",          // when the reveal finishes
  },
  // Content entrance animations
  content: {
    duration: 0.7,
    ease: "power2.out",
    start: "top 75%",
    stagger: 0.12,           // delay between staggered child reveals
  },
  // Custom cursor
  cursor: {
    followerDuration: 0.3,
    followerEase: "power2.out",
    rippleDuration: 0.2,
    rippleEase: "power3.out",
    hoverScale: 2.4,
    hoverDuration: 0.3,
    clickScale: 2.6,
    clickDuration: 0.45,
  },
  // Parallax artwork
  parallax: {
    duration: 0.7,
    ease: "power2.out",
    maxX: 16,
    maxY: 10,
  },
  // Water distortion filter
  waterDistortion: {
    duration: 6,
    ease: "sine.inOut",
    freqA: "0.012 0.022",
    freqB: "0.025 0.012",
  },
  // Ambient particles
  droplets: {
    desktopCount: 24,
    mobileCount: 10,
    minDuration: 5,
    maxDuration: 8,
    maxDelay: 8,
  },
  leaves: {
    desktopCount: 18,
    mobileCount: 8,
    minDuration: 10,
    maxDuration: 16,
    maxDelay: 12,
  },
} as const;

export { gsap, ScrollTrigger };

