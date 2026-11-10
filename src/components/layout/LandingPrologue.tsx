"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface LandingPrologueProps {
  onComplete?: () => void;
}

/**
 * LandingPrologue - Traditional Japanese Washi "Noren" Curtain Opening
 * Displays Vedant's editorial prologue card for 2.5 seconds on authentic washi paper,
 * then gracefully parts like a Japanese noren curtain to reveal the portfolio.
 */
export default function LandingPrologue({ onComplete }: LandingPrologueProps) {
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);

  const hasExitedRef = useRef(false);

  useEffect(() => {
    // Prevent scrolling during prologue
    document.body.style.overflow = "hidden";

    const content = contentRef.current;
    const seal = sealRef.current;
    const leftCurtain = leftCurtainRef.current;
    const rightCurtain = rightCurtainRef.current;

    // 1. Initial State
    gsap.set(content, { opacity: 0, y: 16 });
    if (seal) {
      gsap.set(seal, { scale: 1.4, opacity: 0, rotate: -6 });
    }

    // 2. Entrance Animation
    const entranceTl = gsap.timeline();
    entranceTl
      .to(content, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
      .to(
        seal,
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 0.45,
          ease: "back.out(1.8)",
        },
        "-=0.2"
      );

    // 3. Smooth 0% -> 100% Progress Counter over 2.2 seconds
    const progressObj = { val: 0 };
    const progressTween = gsap.to(progressObj, {
      val: 100,
      duration: 2.2,
      ease: "power1.inOut",
      onUpdate: () => {
        setProgress(Math.floor(progressObj.val));
      },
    });

    // 4. Trigger Curtain Parting at 2.5s
    const exitCurtain = () => {
      if (hasExitedRef.current) return;
      hasExitedRef.current = true;

      const exitTl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setIsFinished(true);
          onComplete?.();
        },
      });

      // Content fades out
      exitTl.to(content, {
        opacity: 0,
        y: -14,
        duration: 0.35,
        ease: "power2.in",
      });

      // Left and Right Washi Curtains Part Gracefully (Japanese Noren Split)
      exitTl
        .to(
          leftCurtain,
          {
            xPercent: -100,
            duration: 0.95,
            ease: "power3.inOut",
          },
          "-=0.1"
        )
        .to(
          rightCurtain,
          {
            xPercent: 100,
            duration: 0.95,
            ease: "power3.inOut",
          },
          "<"
        );
    };

    const timer = setTimeout(() => {
      exitCurtain();
    }, 2500);

    // Allow user to click anywhere to skip immediately
    const handleClick = () => {
      clearTimeout(timer);
      progressTween.kill();
      exitCurtain();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("click", handleClick);
    }

    return () => {
      clearTimeout(timer);
      progressTween.kill();
      entranceTl.kill();
      document.body.style.overflow = "";
      if (container) {
        container.removeEventListener("click", handleClick);
      }
    };
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden select-none cursor-pointer"
      aria-label="Prologue Landing Screen"
    >
      {/* ───────────────────────────────────────────────────────────── */}
      {/* LEFT WASHI CURTAIN (Parts to the left)                         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div
        ref={leftCurtainRef}
        className="absolute top-0 left-0 w-1/2 h-full overflow-hidden will-change-transform shadow-[10px_0_35px_rgba(40,30,20,0.18)] z-10"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/landing-washi.jpg"
          alt="Washi Left Curtain"
          className="absolute top-0 left-0 w-[200vw] h-full max-w-none object-cover object-left"
        />
        {/* Subtle Paper Texture Fiber Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#EBDBC2]/30 pointer-events-none" />
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* RIGHT WASHI CURTAIN (Parts to the right)                       */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div
        ref={rightCurtainRef}
        className="absolute top-0 right-0 w-1/2 h-full overflow-hidden will-change-transform shadow-[-10px_0_35px_rgba(40,30,20,0.18)] z-10"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/landing-washi.jpg"
          alt="Washi Right Curtain"
          className="absolute top-0 right-0 w-[200vw] h-full max-w-none object-cover object-right"
        />
        {/* Subtle Paper Texture Fiber Vignette */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#EBDBC2]/30 pointer-events-none" />
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CENTER PROLOGUE CARD CONTENT                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 text-center will-change-[transform,opacity]"
      >
        {/* 1. Vermilion Hanko Seal */}
        <div
          ref={sealRef}
          className="w-10 h-10 rounded-[5px] border-2 border-vermilion-500 bg-vermilion-500/10 text-vermilion-500 flex items-center justify-center font-jp text-base font-bold shadow-sm mb-5 select-none"
        >
          源
        </div>

        {/* 2. Main Title: Vedant Yadav Pandilwad */}
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-ink-900 tracking-[0.24em] uppercase mb-3">
          VEDANT YADAV PANDILWAD
        </h1>

        {/* 3. Delicate Vermilion Hairline Divider */}
        <div className="w-24 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-vermilion-500/70 to-transparent mb-3.5" />

        {/* 4. Japanese Kanji: Journey of the Mind */}
        <p className="font-jp text-xs sm:text-sm text-vermilion-500 font-bold tracking-[0.32em] mb-3">
          電 脳 の 旅
        </p>

        {/* 5. Subtitle: Roles */}
        <p className="font-sans text-[10px] sm:text-[11px] md:text-xs text-ink-700/90 uppercase tracking-[0.24em] font-medium max-w-md leading-relaxed mb-8">
          Computer Science Student &bull; AI & ML Developer &bull; Systems Craftsman
        </p>

        {/* 6. Hairline Progress Bar & Counter */}
        <div className="flex flex-col items-center gap-2 w-48 sm:w-60">
          <div className="w-full h-[1.5px] bg-ink-900/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-vermilion-500 transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between w-full font-sans text-[10px] tracking-widest text-ink-500 uppercase">
            <span>Loading Passage</span>
            <span className="font-mono font-semibold text-ink-700">{progress}%</span>
          </div>
        </div>

        {/* 7. Subtle Interaction Hint */}
        <span className="absolute bottom-8 font-sans text-[9px] uppercase tracking-[0.28em] text-ink-500/60">
          Click anywhere to skip
        </span>
      </div>
    </div>
  );
}

