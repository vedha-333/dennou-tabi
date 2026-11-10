"use client";

import React, { useState, useEffect, useRef } from "react";
import { Chapter } from "@/data/chapters";
import {
  OWNER_INFO,
  SKILL_CATEGORIES,
  PROJECTS,
  PHILOSOPHY_PILLARS,
} from "@/data/portfolioData";
import { HankoSeal, GithubIcon, LinkedinIcon } from "@/components/graphics/JapaneseMotifs";
import { ArrowDown, ArrowUp, ExternalLink, Check } from "lucide-react";
import { gsap } from "@/lib/gsap";

interface ChapterContentProps {
  chapter: Chapter;
  onNavigateToChapter: (index: number) => void;
}

export default function ChapterContent({ chapter, onNavigateToChapter }: ChapterContentProps) {
  const [activeSkillCategory, setActiveSkillCategory] = useState<number>(0);
  const [activeProjectTab, setActiveProjectTab] = useState<"featured" | "all">("featured");
  const rippleContainerRef = useRef<HTMLDivElement | null>(null);

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
    rippleContainerRef.current = container;

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
    if (rippleContainerRef.current) {
      rippleContainerRef.current.appendChild(ripple);
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

  // GSAP hover pulse for all hanko seals + focus lift for CTA buttons
  useEffect(() => {
    const seals = document.querySelectorAll(".hanko-seal");
    const buttons = document.querySelectorAll("button");

    const enterSeal = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, { scale: 1.15, rotate: 3, duration: 0.3, ease: "back.out(1.5)" });
    };
    const leaveSeal = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, { scale: 1, rotate: 0, duration: 0.3, ease: "power2.out" });
    };

    const enterBtn = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, { scale: 1.02, duration: 0.25, ease: "power2.out" });
    };
    const leaveBtn = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, { scale: 1, duration: 0.25, ease: "power2.out" });
    };

    seals.forEach((s) => {
      s.addEventListener("mouseenter", enterSeal as EventListener);
      s.addEventListener("mouseleave", leaveSeal as EventListener);
    });
    buttons.forEach((b) => {
      b.addEventListener("mouseenter", enterBtn as EventListener);
      b.addEventListener("mouseleave", leaveBtn as EventListener);
    });

    return () => {
      seals.forEach((s) => {
        s.removeEventListener("mouseenter", enterSeal as EventListener);
        s.removeEventListener("mouseleave", leaveSeal as EventListener);
      });
      buttons.forEach((b) => {
        b.removeEventListener("mouseenter", enterBtn as EventListener);
        b.removeEventListener("mouseleave", leaveBtn as EventListener);
      });
    };
  }, []);

  switch (chapter.number) {
    // ==========================================
    // SCENE 01: THE SOURCE · BEFORE SUNRISE
    // ==========================================
    case "01":
      return (
        <div className="w-full max-w-4xl flex flex-col items-start text-left relative py-2 sm:py-3">
          {/* Subtle Japanese Theme Watermark */}
          <div className="absolute right-0 top-0 vertical-jp text-ink-500/20 text-xs sm:text-sm select-none pointer-events-none">
            川の目覚め
          </div>

          {/* Passage Tracker */}
          <div className="flex items-center gap-2 mb-3.5 select-none">
            <span className="font-sans text-[11px] font-bold text-vermilion-500 uppercase tracking-[0.22em]">
              PASSAGE I
            </span>
            <span className="text-ink-400 font-serif text-xs">&bull;</span>
            <span className="font-sans text-[10px] md:text-[11px] font-semibold text-ink-600/90 uppercase tracking-[0.2em]">
              THE SOURCE &bull; BEFORE SUNRISE
            </span>
          </div>

          {/* Editorial Headline matching Passage II typography exactly */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ink-900 tracking-tight leading-[1.06] mb-4 sm:mb-5">
            The code wakes <br className="hidden sm:inline" />
            before the mountain.
          </h1>

          {/* Subtitle / Bio matching Passage II typography */}
          <p className="font-body italic text-sm sm:text-base md:text-lg text-ink-800/90 max-w-2xl leading-relaxed mb-5 sm:mb-6 border-l-2 border-vermilion-500/35 pl-3.5 sm:pl-4 py-0.5">
            &ldquo;{OWNER_INFO.bio}&rdquo;
          </p>

          {/* Identity & Hanko Seal */}
          <div className="flex items-center gap-3.5 mb-6">
            {/* Square vermilion seal */}
            <div className="hanko-seal w-8 h-8 rounded-[4px] border border-vermilion-500/80 bg-vermilion-500/10 text-vermilion-500 flex items-center justify-center font-jp text-xs font-bold shadow-xs select-none">
              源
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base md:text-lg font-bold text-ink-900 leading-tight">
                {OWNER_INFO.name}
              </span>
              <span className="text-[11px] md:text-xs font-sans text-ink-600/90 tracking-wider mt-0.5">
                {OWNER_INFO.title}
              </span>
            </div>
          </div>

          {/* Bottom Scroll Prompt (As seen in Inkbound: BEGIN THE PASSAGE ↓) */}
          <button
            onClick={() => onNavigateToChapter(1)}
            className="group inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.22em] text-ink-700 hover:text-vermilion-500 transition-colors focus:outline-none"
          >
            <span className="border-b border-ink-500/40 group-hover:border-vermilion-500 pb-0.5">
              BEGIN THE PASSAGE
            </span>
            <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-1 text-vermilion-500" />
          </button>
        </div>
      );

    // ==========================================
    // SCENE 02: THE HORIZON · PHILOSOPHY
    // ==========================================
    case "02":
      return (
        <div className="w-full max-w-4xl flex flex-col items-start text-left relative py-8">
          <div className="hidden sm:block absolute -left-12 lg:-left-16 top-6 vertical-jp text-ink-700/60 text-sm select-none">
            志の光
          </div>

          <div className="flex items-center gap-2 mb-4 select-none">
            <span className="font-sans text-[11px] font-bold text-amber-700 uppercase tracking-[0.25em]">
              PASSAGE II
            </span>
            <span className="text-ink-400 font-serif text-xs">&bull;</span>
            <span className="font-sans text-[10px] md:text-[11px] font-semibold text-ink-600 uppercase tracking-[0.22em]">
              THE HORIZON &bull; SILENT STUDY
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ink-900 tracking-tight leading-[1.06] mb-4 sm:mb-6">
            Beyond the horizon, <br className="hidden sm:inline" />
            systems breathe.
          </h2>

          <p className="font-body italic text-sm sm:text-base md:text-lg text-ink-800/90 max-w-2xl leading-relaxed mb-5 sm:mb-6">
            An ivory koi follows a vermilion mark upstream &mdash; exploring how technology can bridge first-principles computer science, scalable backends, and meaningful user craft.
          </p>

          {/* Floating translucent interests cards */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6 sm:mb-8 max-w-2xl">
            {OWNER_INFO.interests.map((interest, idx) => (
              <div
                key={idx}
                className="wash-panel-subtle px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-ink-500/15 flex items-center gap-2.5"
                onMouseEnter={(event) => {
                  gsap.to(event.currentTarget, {
                    y: -4,
                    scale: 1.02,
                    duration: 0.25,
                    ease: "power2.out",
                  });
                }}
                onMouseLeave={(event) => {
                  gsap.to(event.currentTarget, {
                    y: 0,
                    scale: 1,
                    duration: 0.25,
                    ease: "power2.out",
                  });
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-vermilion-500" />
                <span className="font-sans text-xs text-ink-900 font-medium tracking-wide">
                  {interest}
                </span>
              </div>
            ))}
          </div>

          {/* Seal + CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 w-full max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="hanko-seal w-8 h-8 border border-amber-600/70 bg-amber-600/10 text-amber-700 flex items-center justify-center font-jp text-xs font-bold select-none shrink-0">
                志
              </div>
              <span className="font-serif italic text-xs text-ink-600">
                &ldquo;千里の行も足下に始まる&rdquo; &bull; A thousand-mile journey begins with a single step.
              </span>
            </div>

            <button
              onClick={() => onNavigateToChapter(2)}
              className="group flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.25em] text-ink-700 hover:text-vermilion-500 transition-colors shrink-0"
            >
              <span className="border-b border-ink-500/40 group-hover:border-vermilion-500 pb-0.5">
                NEXT PASSAGE
              </span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-1 text-vermilion-500" />
            </button>
          </div>
        </div>
      );

    // ==========================================
    // SCENE 03: THE GROVE · TOOLS OF CREATION
    // ==========================================
    case "03":
      return (
        <div className="w-full max-w-4xl flex flex-col items-start text-left relative py-8">
          <div className="hidden sm:block absolute -left-12 lg:-left-16 top-6 vertical-jp text-ink-700/60 text-sm select-none">
            技の竹林
          </div>

          <div className="flex items-center gap-2 mb-4 select-none">
            <span className="font-sans text-[11px] font-bold text-water-700 uppercase tracking-[0.25em]">
              PASSAGE III
            </span>
            <span className="text-ink-400 font-serif text-xs">&bull;</span>
            <span className="font-sans text-[10px] md:text-[11px] font-semibold text-ink-600 uppercase tracking-[0.22em]">
              THE GROVE &bull; TOOLS OF CREATION
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ink-900 tracking-tight leading-[1.06] mb-4">
            The bamboo gate <br className="hidden sm:inline" />
            remembers every craft.
          </h2>

          <p className="font-body italic text-sm sm:text-base md:text-lg text-ink-800/90 max-w-2xl leading-relaxed mb-5 sm:mb-6">
            Stone lanterns count each ripple. Technical competencies organized across languages, frontend craft, backend architecture, databases, and computer vision.
          </p>

          {/* Minimalist category tabs */}
          <div className="flex flex-wrap gap-2 mb-5">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSkillCategory(idx)}
                className={`px-3 py-1 rounded-full text-xs font-sans tracking-wider transition-all ${
                  activeSkillCategory === idx
                    ? "bg-ink-900 text-parchment-100 font-semibold shadow-sm"
                    : "wash-panel-subtle text-ink-700 hover:text-ink-900 hover:bg-parchment-200"
                }`}
              >
                <span className="font-jp text-[11px] mr-1 opacity-80">{cat.japaneseTitle}</span>
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

          {/* Active Skills Pills */}
          <div className="wash-panel rounded-2xl p-5 md:p-6 w-full max-w-2xl mb-8">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink-500/15">
              <span className="font-serif text-xl font-bold text-ink-900">
                {SKILL_CATEGORIES[activeSkillCategory].title}
              </span>
              <span className="font-jp text-lg text-water-700 font-semibold opacity-70">
                {SKILL_CATEGORIES[activeSkillCategory].japaneseTitle}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SKILL_CATEGORIES[activeSkillCategory].skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-parchment-100/90 rounded-lg px-3 py-2 border border-ink-500/10 text-xs font-sans font-semibold text-ink-900 flex items-center justify-between shadow-xs hover:border-water-500/50 transition-colors"
                >
                  <span>{skill}</span>
                  <Check className="w-3 h-3 text-water-700 opacity-70" />
                </div>
              ))}
            </div>
          </div>

          {/* Seal + CTA */}
          <div className="flex items-center justify-between w-full max-w-2xl">
            <div className="hanko-seal w-8 h-8 border border-water-700/80 bg-water-700/10 text-water-700 flex items-center justify-center font-jp text-xs font-bold select-none">
              技
            </div>
            <button
              onClick={() => onNavigateToChapter(3)}
              className="group flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.25em] text-ink-700 hover:text-vermilion-500 transition-colors"
            >
              <span className="border-b border-ink-500/40 group-hover:border-vermilion-500 pb-0.5">
                VIEW THINGS I&apos;VE BUILT
              </span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-1 text-vermilion-500" />
            </button>
          </div>
        </div>
      );

    // ==========================================
    // SCENE 04: WORKS OF PASSAGE · THINGS I'VE BUILT
    // ==========================================
    case "04":
      return (
        <div className="w-full max-w-4xl flex flex-col items-start text-left relative py-8">
          <div className="hidden sm:block absolute -left-12 lg:-left-16 top-6 vertical-jp text-ink-700/60 text-sm select-none">
            創造の橋
          </div>

          <div className="flex items-center gap-2 mb-4 select-none">
            <span className="font-sans text-[11px] font-bold text-vermilion-500 uppercase tracking-[0.25em]">
              PASSAGE IV
            </span>
            <span className="text-ink-400 font-serif text-xs">&bull;</span>
            <span className="font-sans text-[10px] md:text-[11px] font-semibold text-ink-600 uppercase tracking-[0.22em]">
              THE WATERMILL &bull; THINGS I&apos;VE BUILT
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ink-900 tracking-tight leading-[1.06] mb-4">
            Every bridge connects <br className="hidden sm:inline" />
            thought to reality.
          </h2>

          <p className="font-body italic text-sm sm:text-base md:text-lg text-ink-800/90 max-w-2xl leading-relaxed mb-5 sm:mb-6">
            Beyond the pond, the water turns the wheel. Verified software applications solving tangible problems in voice AI, touchless vision, and network algorithms.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 mb-5 sm:mb-6">
            <button
              onClick={() => setActiveProjectTab("featured")}
              className={`px-3 py-1 rounded-full text-xs font-sans tracking-wide transition-all ${
                activeProjectTab === "featured"
                  ? "bg-ink-900 text-parchment-100 font-semibold"
                  : "wash-panel-subtle text-ink-700 hover:text-ink-900"
              }`}
            >
              Featured Works ({PROJECTS.filter((p) => p.featured).length})
            </button>
            <button
              onClick={() => setActiveProjectTab("all")}
              className={`px-3 py-1 rounded-full text-xs font-sans tracking-wide transition-all ${
                activeProjectTab === "all"
                  ? "bg-ink-900 text-parchment-100 font-semibold"
                  : "wash-panel-subtle text-ink-700 hover:text-ink-900"
              }`}
            >
              All Codebases ({PROJECTS.length})
            </button>
          </div>

          {/* Airy translucent project cards */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 mb-6 sm:mb-8 max-w-4xl">
            {PROJECTS.filter((p) => (activeProjectTab === "featured" ? p.featured : true)).map((proj) => (
              <div
                key={proj.id}
                className="wash-panel rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-vermilion-500/40 hover:shadow-lg transition-all duration-300 group"
                onMouseEnter={(event) => {
                  gsap.to(event.currentTarget, {
                    y: -6,
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }}
                onMouseLeave={(event) => {
                  gsap.to(event.currentTarget, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-jp text-xs px-2 py-0.5 rounded bg-vermilion-500/10 text-vermilion-500 font-bold">
                      {proj.japaneseTitle}
                    </span>
                    <a
                      href={proj.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded text-ink-600 hover:text-vermilion-500 transition-colors"
                      title="Inspect GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-ink-900 group-hover:text-vermilion-500 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-[11px] font-sans text-amber-700 font-medium mb-1.5 sm:mb-2">
                    {proj.subtitle}
                  </p>
                  <p className="font-body text-xs text-ink-800 leading-relaxed mb-4 line-clamp-3 sm:line-clamp-none">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-ink-500/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-parchment-200/60 text-ink-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={proj.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold text-ink-900 hover:text-vermilion-500"
                  >
                    <span>View</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Seal + CTA */}
          <div className="flex items-center justify-between w-full max-w-4xl">
            <div className="hanko-seal w-8 h-8 border border-vermilion-500/80 bg-vermilion-500/10 text-vermilion-500 flex items-center justify-center font-jp text-xs font-bold select-none">
              創
            </div>
            <button
              onClick={() => onNavigateToChapter(4)}
              className="group flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.25em] text-ink-700 hover:text-vermilion-500 transition-colors"
            >
              <span className="border-b border-ink-500/40 group-hover:border-vermilion-500 pb-0.5">
                CONTINUE ASCENT
              </span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-1 text-vermilion-500" />
            </button>
          </div>
        </div>
      );

    // ==========================================
    // SCENE 05: THE ASCENT · ALWAYS BECOMING
    // ==========================================
    case "05":
      return (
        <div className="w-full max-w-4xl flex flex-col items-start text-left relative py-8">
          <div className="hidden sm:block absolute -left-12 lg:-left-16 top-6 vertical-jp text-ink-700/60 text-sm select-none">
            道の高み
          </div>

          <div className="flex items-center gap-2 mb-4 select-none">
            <span className="font-sans text-[11px] font-bold text-ink-800 uppercase tracking-[0.25em]">
              PASSAGE V
            </span>
            <span className="text-ink-400 font-serif text-xs">&bull;</span>
            <span className="font-sans text-[10px] md:text-[11px] font-semibold text-ink-600 uppercase tracking-[0.22em]">
              THE ASCENT &bull; ALWAYS BECOMING
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ink-900 tracking-tight leading-[1.06] mb-4">
            Mastery is a river <br className="hidden sm:inline" />
            that never rests.
          </h2>

          <p className="font-body italic text-sm sm:text-base md:text-lg text-ink-800/90 max-w-2xl leading-relaxed mb-5 sm:mb-6">
            The path ascends through winding stone stairs and mountain mist. Four foundational values that guide every system, interface, and algorithm.
          </p>

          {/* 4 Pillars in clean translucent cards */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 sm:mb-8 max-w-2xl">
            {PHILOSOPHY_PILLARS.map((pillar, idx) => (
              <div key={idx} className="wash-panel rounded-xl p-3.5 sm:p-4 border border-ink-500/15">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-serif text-base font-bold text-ink-900">
                    {pillar.title}
                  </span>
                  <span className="font-jp text-sm text-vermilion-500 font-semibold opacity-80">
                    {pillar.japanese}
                  </span>
                </div>
                <p className="font-body text-xs text-ink-700 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Seal + CTA */}
          <div className="flex items-center justify-between w-full max-w-2xl">
            <div className="hanko-seal w-8 h-8 border border-ink-700/80 bg-ink-700/10 text-ink-800 flex items-center justify-center font-jp text-xs font-bold select-none">
              道
            </div>
            <button
              onClick={() => onNavigateToChapter(5)}
              className="group flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.25em] text-ink-700 hover:text-vermilion-500 transition-colors"
            >
              <span className="border-b border-ink-500/40 group-hover:border-vermilion-500 pb-0.5">
                EPILOGUE
              </span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-1 text-vermilion-500" />
            </button>
          </div>
        </div>
      );

    // ==========================================
    // SCENE 06: EPILOGUE · EVERY RIVER IS A WAY HOME
    // ==========================================
    case "06":
      return (
        <div className="w-full max-w-4xl flex flex-col items-start text-left relative py-8">
          <div className="hidden sm:block absolute -left-12 lg:-left-16 top-6 vertical-jp text-ink-700/60 text-sm select-none">
            結びの夕
          </div>

          <div className="flex items-center gap-2 mb-4 select-none">
            <span className="font-sans text-[11px] font-bold text-vermilion-500 uppercase tracking-[0.25em]">
              EPILOGUE
            </span>
            <span className="text-ink-400 font-serif text-xs">&bull;</span>
            <span className="font-sans text-[10px] md:text-[11px] font-semibold text-ink-600 uppercase tracking-[0.22em]">
              THE REMEMBERED CURRENT
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ink-900 tracking-tight leading-[1.06] mb-4">
            Every river is <br className="hidden sm:inline" />
            a way home.
          </h2>

          <p className="font-body italic text-sm sm:text-base md:text-lg lg:text-xl text-ink-800/90 max-w-2xl leading-relaxed mb-5 sm:mb-6">
            The water closes without a seam, but somewhere downstream a red moon trembles again. Thank you for walking through this illustrated watercolor story.
          </p>

          {/* Minimalist Contact Card */}
          <div className="wash-panel rounded-2xl p-5 sm:p-6 w-full max-w-2xl mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ink-500/15">
              <div className="flex items-center gap-3">
                <HankoSeal className="w-10 h-10 shadow-sm" />
                <div>
                  <h3 className="font-serif text-xl font-bold text-ink-900">
                    {OWNER_INFO.name}
                  </h3>
                  <p className="text-xs font-sans text-ink-600">
                    {OWNER_INFO.title}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                <a
                  href={OWNER_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-ink-900 text-parchment-100 hover:bg-vermilion-500 transition-colors font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-xs"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Profile</span>
                </a>

                <a
                  href={OWNER_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#0A66C2] text-white hover:bg-[#004182] transition-colors font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-xs"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0 text-xs font-sans text-ink-600">
              <span className="italic font-serif">一期一会 &bull; Treasure every unrepeatable encounter.</span>
              <span className="text-vermilion-500 font-semibold text-[11px] tracking-wider uppercase">
                Open for Collaboration
              </span>
            </div>
          </div>

          {/* Return to Source CTA (As seen in Inkbound: RETURN TO THE SOURCE ↑) */}
          <button
            onClick={() => onNavigateToChapter(0)}
            onMouseEnter={triggerRipple}
             onMouseLeave={triggerRipple}
            className="group flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.28em] text-ink-700 hover:text-vermilion-500 transition-colors focus:outline-none"
          >
            <span className="w-2 h-2 rounded-full bg-vermilion-500/80 group-hover:bg-vermilion-500 group-hover:scale-125 transition-all" />
            <span className="border-b border-ink-500/40 group-hover:border-vermilion-500 pb-0.5">
              RETURN TO THE SOURCE
            </span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1 text-vermilion-500" />
          </button>
        </div>
      );

    default:
      return null;
  }
}
