"use client";

import React from "react";
import { CHAPTERS } from "@/data/chapters";

interface PageIndicatorProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function PageIndicator({ activeIndex, onSelect }: PageIndicatorProps) {
  return (
    <aside
      aria-label="Story chapters"
      className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4 select-none"
    >
      {/* Decorative vertical line */}
      <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-ink-500/30" />

      {/* Chapter node dots */}
      <div className="flex flex-col items-center gap-3">
        {CHAPTERS.map((chap, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={chap.id}
              onClick={() => onSelect(idx)}
              aria-label={`Jump to Chapter ${chap.number}: ${chap.title}`}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none"
            >
              {/* Tooltip on hover */}
              <div className="absolute right-8 px-3 py-1 bg-ink-900 text-parchment-100 text-[11px] font-sans tracking-wider rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-x-1 group-hover:translate-x-0 shadow-lg flex items-center gap-2">
                <span className="font-jp text-vermilion-300">{chap.kanji}</span>
                <span>{chap.title}</span>
              </div>

              {/* Indicator Dot */}
              <div
                className={`transition-all duration-500 rounded-full flex items-center justify-center ${
                  isActive
                    ? "w-6 h-6 border border-vermilion-500 bg-vermilion-500/10 scale-110"
                    : "w-2 h-2 bg-ink-500/30 group-hover:bg-ink-700 group-hover:scale-125"
                }`}
              >
                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-vermilion-500 animate-pulse" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Decorative vertical line */}
      <div className="w-[1px] h-12 bg-gradient-to-b from-ink-500/30 to-transparent" />

      {/* Active Scene Counter */}
      <div className="text-[10px] font-sans tracking-widest text-ink-500 uppercase flex flex-col items-center">
        <span className="font-bold text-ink-900">{CHAPTERS[activeIndex]?.number || "01"}</span>
        <span className="h-[1px] w-3 bg-ink-500/40 my-0.5" />
        <span className="opacity-60">06</span>
      </div>
    </aside>
  );
}

