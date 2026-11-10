"use client";

import React, { useState, useEffect, useRef } from "react";
import { CHAPTERS } from "@/data/chapters";
import { OWNER_INFO } from "@/data/portfolioData";
import { GithubIcon } from "@/components/graphics/JapaneseMotifs";
import { Menu, X } from "lucide-react";
import { gsap } from "@/lib/gsap";

interface NavigationProps {
  activeChapterIndex: number;
  onNavigateToChapter: (index: number) => void;
}

export default function Navigation({ activeChapterIndex, onNavigateToChapter }: NavigationProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const ripplesContainerRef = useRef<HTMLDivElement | null>(null);

  // Initialize ripple container
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
    ripplesContainerRef.current = container;

    return () => {
      container.remove();
    };
  }, []);

  // Trigger ripple effect on any element
  const triggerRipple = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;

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
    if (ripplesContainerRef.current) {
      ripplesContainerRef.current.appendChild(ripple);
    }

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
  };

  return (
    <>
      {/* Top thin vermilion scroll progress bar across the screen */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-vermilion-500 z-[70] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 py-4 sm:py-5 px-4 sm:px-6 md:px-12 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Top Left: Brand and Japanese Chapter Subtitle (Matching Inkbound) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => onNavigateToChapter(0)}
              onMouseEnter={triggerRipple}
              onMouseLeave={triggerRipple}
              className="group flex items-center gap-2 sm:gap-2.5 text-left focus:outline-none"
            >
              <span className="font-serif text-sm md:text-base font-bold tracking-[0.2em] uppercase text-ink-900 group-hover:text-vermilion-500 transition-colors">
                VEDANT
              </span>
              <span className="font-jp text-[10px] sm:text-[11px] text-vermilion-500 font-semibold tracking-wider bg-vermilion-500/10 px-1.5 py-0.5 rounded border border-vermilion-500/20">
                電脳の旅
              </span>
            </button>
          </div>

          {/* Top Center: Minimalist Circular Chapter Indicators (Matching Inkbound: · · ( ) · · ·) */}
          <nav
            aria-label="Story Passages"
            className="hidden sm:flex items-center gap-2 md:gap-3.5 select-none"
          >
            {CHAPTERS.map((chap, idx) => {
              const isActive = activeChapterIndex === idx;
              return (
                <button
                  key={chap.id}
                  onClick={() => onNavigateToChapter(idx)}
                  onMouseEnter={triggerRipple}
                  onMouseLeave={triggerRipple}
                  aria-label={`Jump to Passage ${chap.number}: ${chap.title}`}
                  className="relative p-1.5 flex items-center justify-center group focus:outline-none"
                >
                  {/* Tooltip on hover */}
                  <span className="absolute -bottom-8 px-2.5 py-0.5 bg-ink-900/90 text-parchment-100 text-[10px] font-sans tracking-widest rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none -translate-y-1 group-hover:translate-y-0 shadow-md">
                    {chap.kanji} &bull; {chap.title}
                  </span>

                  {isActive ? (
                    /* Active Chapter: vermilion ring with center dot */
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-vermilion-500 flex items-center justify-center transition-all duration-300 scale-110">
                      <div className="w-1.5 h-1.5 md:w-2 h-2 rounded-full bg-vermilion-500" />
                    </div>
                  ) : (
                    /* Inactive Chapter: clean subtle dot */
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-ink-500/30 group-hover:bg-vermilion-500/50 group-hover:scale-125 transition-all duration-200" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Top Right: "SCROLL MOVES THE WATER" + GitHub link */}
          <div className="flex items-center gap-6">
            <span
              onMouseEnter={triggerRipple}
              onMouseLeave={triggerRipple}
              className="hidden sm:inline-block font-sans text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-ink-700/80 font-medium select-none"
            >
              SCROLL TO DISCOVER
            </span>

            <a
              href={OWNER_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={triggerRipple}
              onMouseLeave={triggerRipple}
              className="flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest text-ink-700 hover:text-vermilion-500 transition-colors"
              title="Visit GitHub Profile"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-medium text-[11px]">GitHub</span>
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={triggerRipple}
              onMouseLeave={triggerRipple}
              aria-label="Toggle menu"
              className="md:hidden p-1 text-ink-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden wash-panel mx-2 mt-3 rounded-2xl p-5 shadow-xl border border-ink-500/15 animate-in fade-in slide-in-from-top-3">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase font-sans tracking-widest text-ink-500 font-semibold mb-1">
                Passages of the Story
              </span>
              {CHAPTERS.map((chap, idx) => (
                <button
                  key={chap.id}
                  onClick={() => {
                    onNavigateToChapter(idx);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs ${
                    activeChapterIndex === idx
                      ? "bg-ink-900 text-parchment-100 font-semibold"
                      : "text-ink-800 hover:bg-parchment-200"
                  }`}
                >
                  <span className="font-serif text-sm">{chap.title}</span>
                  <span className="font-jp text-vermilion-400">{chap.kanji}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
