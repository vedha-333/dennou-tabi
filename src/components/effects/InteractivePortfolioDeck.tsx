"use client";

import React, { useState, useRef } from "react";
import { PROJECTS } from "@/data/portfolioData";
import { ExternalLink, ChevronRight, Layers } from "lucide-react";
import { HankoSeal, GithubIcon } from "@/components/graphics/JapaneseMotifs";

export default function InteractivePortfolioDeck() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Use top 3 featured projects
  const deckCards = PROJECTS.slice(0, 3);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // If dragged enough horizontally, cycle to next card
    if (Math.abs(dragOffset.x) > 60 || Math.abs(dragOffset.y) > 60) {
      setActiveIdx((prev) => (prev + 1) % deckCards.length);
    }
    setDragOffset({ x: 0, y: 0 });
  };

  const nextCard = () => {
    setActiveIdx((prev) => (prev + 1) % deckCards.length);
  };

  return (
    <div className="flex flex-col items-center select-none w-full max-w-[380px] mx-auto">
      {/* Deck Header Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-vermilion-500 animate-pulse" />
        <span className="font-sans text-[11px] font-bold text-ink-700/90 uppercase tracking-[0.2em] flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-vermilion-500" />
          Tactile Project Deck &bull; Drag to Flip
        </span>
      </div>

      {/* 3D Card Stack Container */}
      <div
        className="relative w-full aspect-[676/940] touch-none"
        style={{ perspective: "1100px" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {deckCards.map((project, idx) => {
          // Calculate stack position relative to active card
          const stackPos = (idx - activeIdx + deckCards.length) % deckCards.length;
          const isTop = stackPos === 0;

          // Transforms based on stack depth
          const scale = isTop ? 1 : stackPos === 1 ? 0.94 : 0.88;
          const translateY = isTop
            ? dragOffset.y
            : stackPos === 1
            ? 18
            : 36;
          const translateX = isTop ? dragOffset.x : 0;
          const rotateZ = isTop
            ? dragOffset.x * 0.06
            : stackPos === 1
            ? 3.5
            : -3.5;
          const zIndex = isTop ? 30 : stackPos === 1 ? 20 : 10;
          const opacity = isTop ? 1 : stackPos === 1 ? 0.92 : 0.75;

          const kanjiSymbol =
            idx === 0 ? "解決" : idx === 1 ? "触手" : "最適";

          return (
            <div
              key={project.id}
              className={`absolute inset-0 rounded-[26px] bg-[#FAF4E8] text-ink-900 overflow-hidden cursor-grab active:cursor-grabbing border border-[#4B5047]/20 shadow-[0_20px_50px_rgba(26,29,25,0.14)] ${
                isDragging && isTop ? "transition-none" : "transition-all duration-300 ease-out"
              }`}
              style={{
                transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale}) rotateZ(${rotateZ}deg)`,
                zIndex,
                opacity,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Traditional Washi Paper Grain & Hairline Highlight */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none rounded-[26px]"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.75), transparent 70%)",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[26px] pointer-events-none p-[1px]"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(246,236,218,0.5) 45%, rgba(184,76,61,0.3) 100%)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              {/* Card Body */}
              <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-full select-none">
                {/* Top Row: Japanese Seal & Index */}
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-ink-500/10 pb-3">
                    <div className="flex items-center gap-2">
                      <HankoSeal className="w-8 h-8" />
                      <span className="font-serif italic text-sm text-ink-600">
                        {project.japaneseTitle}
                      </span>
                    </div>
                    <span className="font-sans text-xs font-bold text-vermilion-500 tracking-wider">
                      0{idx + 1} / 0{deckCards.length}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900 leading-tight mb-2">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs font-semibold text-vermilion-600/90 tracking-wide mb-4">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="font-serif text-sm text-ink-700/90 leading-relaxed mb-5">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Row: Technologies & Repository Link */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-sans text-[10px] font-semibold text-ink-800 bg-[#EFE4D0]/80 px-2 py-0.5 rounded-full border border-ink-500/15"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-ink-500/10">
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-ink-900 hover:text-vermilion-500 transition-colors pointer-events-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GithubIcon className="w-4 h-4 text-vermilion-500" />
                      <span>View Source</span>
                      <ExternalLink className="w-3 h-3 text-ink-400" />
                    </a>

                    <button
                      onClick={nextCard}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-ink-600 hover:text-ink-900 transition-colors pointer-events-auto px-2.5 py-1 rounded-md bg-ink-500/5 hover:bg-ink-500/10"
                    >
                      <span>Flip</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Indicators */}
      <div className="flex items-center gap-2 mt-4">
        {deckCards.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            aria-label={`Go to card ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              activeIdx === i
                ? "w-6 h-1.5 bg-vermilion-500"
                : "w-2 h-1.5 bg-ink-400/40 hover:bg-ink-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
