"use client";

import React, { useEffect, useRef, useState } from "react";
import { CHAPTERS } from "@/data/chapters";
import ChapterContent from "./ChapterContent";
import ParallaxArtwork from "@/components/effects/ParallaxArtwork";
import TactileCard from "@/components/ui/TactileCard";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface SceneManagerProps {
  onChapterChange?: (index: number) => void;
}

export default function SceneManager({ onChapterChange }: SceneManagerProps) {
  const [activeChapter, setActiveChapter] = useState(0);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // ─── INITIAL STATE: ZEN WATER-RIPPLE INK BLOOM TRANSITION ───────────────
    layerRefs.current.forEach((mask, idx) => {
      if (!mask) return;
      if (idx === 0) {
        gsap.set(mask, {
          clipPath: "circle(150% at 50% 55%)",
          autoAlpha: 1,
        });
      } else {
        gsap.set(mask, {
          clipPath: "circle(0% at 50% 55%)",
          autoAlpha: 1,
        });
      }
    });

    ringRefs.current.forEach((ring, idx) => {
      if (!ring) return;
      gsap.set(ring, {
        scale: 0.05,
        opacity: 0,
      });
    });

    innerRefs.current.forEach((inner, idx) => {
      if (!inner) return;
      if (idx === 0) {
        gsap.set(inner, {
          scale: 1,
          rotate: 0,
          opacity: 1,
          filter: "blur(0px)",
        });
      } else {
        gsap.set(inner, {
          scale: 1.10,
          rotate: idx % 2 === 0 ? 0.5 : -0.5,
          opacity: 1,
          filter: "blur(0px)",
        });
      }
    });

    const ctx = gsap.context(() => {
      // ─── ZEN WATER-RIPPLE EXPANDING INK-BLOOM TRANSITION ───────────────────
      for (let i = 1; i < CHAPTERS.length; i++) {
        const incomingMask = layerRefs.current[i];
        const incomingInner = innerRefs.current[i];
        const incomingRing = ringRefs.current[i];
        const outgoingInner = innerRefs.current[i - 1];
        const section = sectionRefs.current[i];

        if (!incomingMask || !incomingInner || !section) continue;

        // ─── 1. ZEN WATER-RIPPLE EXPANDING INK-BLOOM TRANSITION ─────────────
        // Blossoms dynamically from (50%, 55%) as the incoming section approaches top
        const bgTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top top",
            scrub: 1.0,
            invalidateOnRefresh: true,
          },
        });

        // Expanding Water Ripple Mask
        bgTl.fromTo(
          incomingMask,
          { clipPath: "circle(0% at 50% 55%)" },
          {
            clipPath: "circle(150% at 50% 55%)",
            ease: "power2.inOut",
          },
          0
        );

        // Concentric Water-Ripple Crest
        if (incomingRing) {
          bgTl.fromTo(
            incomingRing,
            { scale: 0.05, opacity: 0 },
            { scale: 1.5, opacity: 0.95, duration: 0.6, ease: "power1.out" },
            0
          ).to(
            incomingRing,
            { opacity: 0, duration: 0.4, ease: "power1.in" },
            0.6
          );
        }

        // Incoming artwork counter-parallax zoom & organic settling float
        bgTl.fromTo(
          incomingInner,
          {
            scale: 1.10,
            rotate: i % 2 === 0 ? 0.5 : -0.5,
          },
          {
            scale: 1.0,
            rotate: 0,
            ease: "power2.out",
          },
          0
        );

        // Outgoing artwork: Softly settles into atmospheric mist depth
        if (outgoingInner) {
          bgTl.to(
            outgoingInner,
            {
              scale: 0.95,
              opacity: 0.35,
              filter: "blur(3px)",
              ease: "power2.out",
            },
            0
          );
        }
      }

      // ─── 2. ASYMMETRIC CONTENT PACING: SLOW APPEAR, PINNED READING, FAST DISAPPEAR ─
      sectionRefs.current.forEach((section, idx) => {
        if (!section) return;
        const contentBox = contentRefs.current[idx];

        // A. SLOW ENTRANCE (Content Appears gradually as section scrolls in)
        if (idx > 0 && contentBox) {
          gsap.fromTo(
            contentBox,
            {
              y: 60,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              ease: "power2.out", // Slow, graceful settling into view
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top top",
                scrub: 1.1, // Smooth, slow scrub for readable arrival
                invalidateOnRefresh: true,
              },
            }
          );
        }

        // B. PINNED READING SHELF + FAST DISAPPEAR (Content Exits briskly)
        // While section sticky container is pinned (top top -> bottom top):
        // 0% -> 58%: Stationary Reading Shelf (User reads comfortably without scroll drift)
        // 58% -> 100%: Fast acceleration outward (power2.in) as user scrolls to leave
        if (idx < CHAPTERS.length - 1 && contentBox) {
          const exitTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.65, // Snappy exit scrub
              invalidateOnRefresh: true,
            },
          });

          exitTl
            .to(contentBox, {
              y: 0,
              opacity: 1,
              duration: 0.58,
              ease: "none",
            })
            .to(contentBox, {
              y: -80,
              opacity: 0,
              duration: 0.42,
              ease: "power2.in", // Fast, brisk acceleration outward
            });
        }

        // C. ACTIVE CHAPTER OBSERVER (Sync Navigation Dots & Page Indicator)
        ScrollTrigger.create({
          trigger: section,
          start: "top 35%",
          end: "bottom 65%",
          onEnter: () => {
            setActiveChapter(idx);
            onChapterChange?.(idx);
          },
          onEnterBack: () => {
            setActiveChapter(idx);
            onChapterChange?.(idx);
          },
        });
      });

      // ─── 3. LUXURY MAGNETIC SNAP: Docks cleanly into each chapter's reading shelf ─
      ScrollTrigger.create({
        snap: {
          snapTo: (progress) => {
            const scrollMax = ScrollTrigger.maxScroll(window);
            if (!scrollMax) return progress;
            const targets = sectionRefs.current
              .filter(Boolean)
              .map((sec) => sec!.offsetTop / scrollMax);

            let closest = targets[0] ?? 0;
            let minDiff = Math.abs(progress - closest);
            for (const t of targets) {
              const diff = Math.abs(progress - t);
              if (diff < minDiff) {
                minDiff = diff;
                closest = t;
              }
            }
            return closest;
          },
          duration: { min: 0.35, max: 0.65 },
          delay: 0.08,
          ease: "power2.out",
        },
      });
    });

    // Keyboard navigation (ArrowDown / ArrowUp / PageDown / PageUp)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input/textarea
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        setActiveChapter((cur) => {
          const next = Math.min(CHAPTERS.length - 1, cur + 1);
          const target = sectionRefs.current[next];
          if (target) {
            const lenis = (window as any).lenis;
            if (lenis) lenis.scrollTo(target, { duration: 1.25 });
            else target.scrollIntoView({ behavior: "smooth" });
          }
          return next;
        });
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        setActiveChapter((cur) => {
          const prev = Math.max(0, cur - 1);
          const target = sectionRefs.current[prev];
          if (target) {
            const lenis = (window as any).lenis;
            if (lenis) lenis.scrollTo(target, { duration: 1.25 });
            else target.scrollIntoView({ behavior: "smooth" });
          }
          return prev;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Refresh ScrollTrigger once DOM layout and images settle
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener("keydown", handleKeyDown);
      ctx.revert();
    };
  }, [onChapterChange]);

  const handleNavigate = (index: number) => {
    const targetSection = sectionRefs.current[index];
    if (targetSection) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(targetSection, { duration: 1.25 });
      } else {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative w-full">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* PERMANENT SAFETY BASE: Guarantees screen is NEVER black              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 bg-[#F6E8CF]"
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/scenes/1.png"
          alt="Permanent Base Landscape"
          className="w-full h-full object-cover object-center scale-100"
          loading="eager"
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* FIXED LAYERED ARTWORK CANVAS — CINEMATIC MULTIPLANE SCROLL           */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none select-none z-[1] overflow-hidden"
        aria-hidden="true"
      >
        {CHAPTERS.map((chap, idx) => (
          <div
            key={chap.id}
            ref={(el) => {
              layerRefs.current[idx] = el;
            }}
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{
              zIndex: 10 + idx * 10,
              willChange: "clip-path",
              clipPath: idx === 0 ? "circle(150% at 50% 55%)" : "circle(0% at 50% 55%)",
            }}
          >
            {/* Counter-Parallax Scale & Depth Container */}
            <div
              ref={(el) => {
                innerRefs.current[idx] = el;
              }}
              className="w-full h-full will-change-transform"
              style={{
                transformOrigin: "50% 55%",
              }}
            >
              <ParallaxArtwork src={chap.imageSrc} alt={chap.imageAlt} />
            </div>

            {/* Soft Water-Ripple Wave Crest (Concentric washi & vermilion water rings) */}
            <div
              ref={(el) => {
                ringRefs.current[idx] = el;
              }}
              className="absolute inset-0 pointer-events-none will-change-transform opacity-0 z-[10]"
              style={{
                transformOrigin: "50% 55%",
                background:
                  "radial-gradient(circle at 50% 55%, transparent 0%, transparent 63%, rgba(246, 232, 207, 0.5) 66%, rgba(184, 76, 61, 0.28) 68.5%, rgba(246, 232, 207, 0.45) 71%, transparent 74%)",
              }}
            />
          </div>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SCROLLABLE STORYTELLING PASSAGES                                    */}
      {/* Odd Pages (1, 3, 5): Left-hand side                                 */}
      {/* Even Pages (2, 4, 6): Right-hand side                                */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full">
        {CHAPTERS.map((chap, idx) => {
          const isEvenPage = (idx + 1) % 2 === 0;
          const isHero = idx === 0;

          return (
            <section
              key={chap.id}
              id={`chapter-${idx}`}
              ref={(el) => {
                sectionRefs.current[idx] = el;
              }}
              className={`relative w-full ${
                idx === CHAPTERS.length - 1 ? "min-h-screen pb-20" : "h-[155vh]"
              }`}
            >
              {/* Sticky Pinned Reading Stage (Locks content comfortably in center for reading) */}
              <div
                className={`sticky top-0 h-screen w-full flex items-center ${
                  isHero
                    ? "justify-center"
                    : isEvenPage
                    ? "justify-end"
                    : "justify-start"
                } px-6 sm:px-12 md:px-16 lg:px-24 pt-20 md:pt-28 pb-10 md:pb-14 pointer-events-none`}
              >
                <div
                  ref={(el) => {
                    contentRefs.current[idx] = el;
                  }}
                  className={`chapter-content-box w-full ${
                    isHero ? "max-w-3xl" : "max-w-2xl"
                  } pointer-events-auto will-change-[transform,opacity]`}
                >
                  {isHero ? (
                    /* HERO SECTION: Editorial Intro */
                    <div className="w-full translate-y-4 sm:translate-y-8">
                      <TactileCard accentColor="#B84C3D">
                        <ChapterContent
                          chapter={chap}
                          onNavigateToChapter={handleNavigate}
                        />
                      </TactileCard>
                    </div>
                  ) : (
                    /* CHAPTERS 2..6: Tactile Japanese 3D Card */
                    <TactileCard accentColor={chap.theme.accent}>
                      <ChapterContent
                        chapter={chap}
                        onNavigateToChapter={handleNavigate}
                      />
                    </TactileCard>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
