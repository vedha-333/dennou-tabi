"use client";

import React from "react";

export default function AtmosphericGlow() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-10 overflow-hidden"
    >
      {/* 1. Subtle warm radiant sun halo bloom in the upper-right matching the artwork's painted sun */}
      <div className="absolute top-8 md:top-12 right-12 md:right-32 w-48 h-48 sm:w-64 sm:h-64 rounded-full blur-3xl bg-vermilion-500/15 mix-blend-multiply" />

      {/* 2. Soft atmospheric morning mist across the river/lake valley */}
      <div className="absolute inset-0 bg-gradient-to-r from-parchment-100/10 via-parchment-50/15 to-transparent mix-blend-soft-light" />

      {/* 3. Subtle vignette around screen edges to frame the watercolor canvas */}
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(75,80,71,0.08)]" />
    </div>
  );
}
