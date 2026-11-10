"use client";

import React, { useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import Navigation from "@/components/layout/Navigation";
import SceneManager from "@/components/scenes/SceneManager";
import CustomCursor from "@/components/effects/CustomCursor";
import FloatingLeaves from "@/components/effects/FloatingLeaves";
import WaterDistortion from "@/components/effects/WaterDistortion";
import AtmosphericGlow from "@/components/effects/AtmosphericGlow";
import LandingPrologue from "@/components/layout/LandingPrologue";

export default function Home() {
  // Initialize Lenis momentum smooth scrolling
  const lenisRef = useLenis();
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const handleNavigateToChapter = (index: number) => {
    setActiveChapterIndex(index);
    const target = document.getElementById(`chapter-${index}`);
    if (target) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: 0, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-parchment-100 text-ink-900 overflow-x-hidden selection:bg-vermilion-500 selection:text-parchment-50 parchment-grain">
      {/* 0. Prologue Landing Curtain: 2.5s Washi Noren Curtain Reveal */}
      <LandingPrologue />

      {/* 1. Atmospheric Ambient Glow & River Mist */}
      <AtmosphericGlow />

      {/* 2. Custom Liquid Cursor: Normal cursor remains visible, with a fluid GSAP water ripple follower */}
      <CustomCursor />

      {/* 3. Ambient Environmental FX: Tumbling sakura petals */}
      <FloatingLeaves />

      {/* 5. Subtle SVG Water Distortion Filter */}
      <WaterDistortion />

      {/* 6. ThreeUI-Style Minimalist Header: Inkbound River Story masthead */}
      <Navigation
        activeChapterIndex={activeChapterIndex}
        onNavigateToChapter={handleNavigateToChapter}
      />

      {/* 7. Cinematic Scene Manager (Fixed layered watercolor art + left-to-right diagonal wipe reveals + frosted blur panels) */}
      <SceneManager onChapterChange={setActiveChapterIndex} />
    </main>
  );
}
