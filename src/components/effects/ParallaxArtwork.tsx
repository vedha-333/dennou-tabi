"use client";

import React, { useRef, useEffect } from "react";

interface ParallaxArtworkProps {
  src: string;
  alt: string;
  className?: string;
}

interface TrailPoint {
  x: number;
  y: number;
  radius: number;
  life: number;
}

/**
 * ParallaxArtwork with Japanese Washi Pixel-Mask Canvas
 * - Inset by 4 blocks from all edges (leaving outer borders 100% clean)
 * - Warm washi parchment & delicate vermilion tiles (NO black, NO gray)
 * - Dynamic cursor hover trail that dissolves paper tiles in real-time
 * - Center of the artwork remains clear and serene
 */
export default function ParallaxArtwork({
  src,
  alt,
  className = "",
}: ParallaxArtworkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const TILE = 24; // Size of halftone grid cell
    const EDGE_BLOCKS = 4; // Leave 4 blocks from all edges completely clean
    let cols = Math.ceil(width / TILE);
    let rows = Math.ceil(height / TILE);

    // Deterministic hash function from ThreeUI
    const hash = (x: number, y: number) => {
      const val = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return val - Math.floor(val);
    };

    // Pre-calculate baseline cell noise mask
    let cellMask: Float32Array;
    const computeCellMask = () => {
      cellMask = new Float32Array(cols * rows);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;

          // 1. Strictly leave the outer 4 blocks clean from all edges
          if (
            r < EDGE_BLOCKS ||
            r >= rows - EDGE_BLOCKS ||
            c < EDGE_BLOCKS ||
            c >= cols - EDGE_BLOCKS
          ) {
            cellMask[idx] = 0;
            continue;
          }

          // 2. Distance from the 4-block margin into the artwork
          const distH = Math.min(c - EDGE_BLOCKS, (cols - 1 - EDGE_BLOCKS) - c);
          const distV = Math.min(r - EDGE_BLOCKS, (rows - 1 - EDGE_BLOCKS) - r);
          const distFromMargin = Math.min(distH, distV);

          // 3. Edge framing band (width ~6 blocks from margin, fading to 0 towards center)
          const edgeBand = Math.pow(1 - Math.min(distFromMargin / 6.0, 1), 1.5);
          const baseNoise = hash(c * 1.73 + 19, r * 2.11 + 37);

          // In the center (distFromMargin >= 6), edgeBand is 0, so cellMask <= 0.48.
          // Since threshold = 0.65, NO tiles are drawn in the center!
          cellMask[idx] = baseNoise * 0.48 + edgeBand * 0.52;
        }
      }
    };
    computeCellMask();

    const handleResize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      cols = Math.ceil(width / TILE);
      rows = Math.ceil(height / TILE);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      computeCellMask();
    };
    handleResize();

    // Mouse pointer tracking
    const trail: TrailPoint[] = [];
    const maxTrailPoints = 18;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= -50 && x <= width + 50 && y >= -50 && y <= height + 50) {
        trail.push({
          x,
          y,
          radius: 110,
          life: 1.0,
        });

        if (trail.length > maxTrailPoints) {
          trail.shift();
        }
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize);

    // Animation Render Loop
    let lastTime = performance.now();
    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Washi Japanese Drafting Grid (Warm washi tone, NO black, NO gray)
      ctx.save();
      ctx.strokeStyle = "rgba(180, 160, 135, 0.10)";
      ctx.lineWidth = 0.75;
      ctx.beginPath();

      for (let x = 0; x <= width; x += TILE) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
      }

      for (let y = 0; y <= height; y += TILE) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
      }
      ctx.stroke();
      ctx.restore();

      // 2. Update Hover Trail Points
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].life -= dt * 1.35;
        if (trail[i].life <= 0) {
          trail.splice(i, 1);
        }
      }

      // 3. Render Washi Pixel-Mask Tiles (Warm parchment & vermilion, NO black, NO gray)
      const nowSec = time * 0.001;

      for (let r = EDGE_BLOCKS; r < rows - EDGE_BLOCKS; r++) {
        for (let c = EDGE_BLOCKS; c < cols - EDGE_BLOCKS; c++) {
          const idx = r * cols + c;
          const maskVal = cellMask[idx];
          if (maskVal === 0) continue;

          const cellCenterX = c * TILE + TILE / 2;
          const cellCenterY = r * TILE + TILE / 2;

          // Check distance to active cursor trail points
          let isRevealed = false;
          let hoverGlow = 0;

          for (let p = 0; p < trail.length; p++) {
            const pt = trail[p];
            const dx = cellCenterX - pt.x;
            const dy = cellCenterY - pt.y;
            const distSq = dx * dx + dy * dy;
            const curRadius = pt.radius * (0.4 + pt.life * 0.6);

            if (distSq < curRadius * curRadius) {
              isRevealed = true;
              break;
            } else if (distSq < (curRadius + 45) * (curRadius + 45)) {
              hoverGlow = Math.max(hoverGlow, pt.life * 0.5);
            }
          }

          // If revealed by cursor hover, do not render tile (reveals clean watercolor underneath)
          if (isRevealed) continue;

          // Halftone noise tiles along the framing band
          const threshold = 0.65;
          if (maskVal > threshold) {
            const jitter = Math.sin(nowSec * 1.5 + c * 0.4 + r * 0.5) * 0.04;
            const alpha = Math.min(0.75, (maskVal - threshold) * 2.6 + jitter);

            if (maskVal > 0.93 && (c < EDGE_BLOCKS + 4 || c > cols - EDGE_BLOCKS - 5)) {
              // Subtle vermilion hanko stamp tile
              ctx.fillStyle = `rgba(184, 76, 61, ${alpha * 0.7})`;
            } else {
              // Warm washi parchment tile matching the site paper palette (NO black, NO gray)
              ctx.fillStyle = `rgba(246, 232, 207, ${alpha * 0.85})`;
            }

            ctx.fillRect(c * TILE, r * TILE, TILE, TILE);

            // Delicate soft paper fiber outline
            ctx.strokeStyle = `rgba(225, 205, 175, ${alpha * 0.4})`;
            ctx.lineWidth = 0.5;
            ctx.strokeRect(c * TILE + 0.5, r * TILE + 0.5, TILE - 1, TILE - 1);
          } else if (hoverGlow > 0 && maskVal > 0.45) {
            // Delicate warm shimmer surrounding cursor trail
            ctx.fillStyle = `rgba(184, 76, 61, ${hoverGlow * 0.28})`;
            ctx.fillRect(c * TILE, r * TILE, TILE, TILE);
          }
        }
      }
    };
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden select-none pointer-events-none bg-[#F6E8CF] ${className}`}
    >
      {/* 1. Underlying Crisp Japanese Watercolor Artwork */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center scale-100 will-change-transform"
        loading="eager"
      />

      {/* 2. Interactive Halftone Washi Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
      />

      {/* 3. Subtle atmospheric vignette and light gradient preserving original artwork vibrancy */}
      <div className="absolute inset-0 bg-gradient-to-t from-parchment-100/30 via-transparent to-transparent pointer-events-none z-[3]" />
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(75,80,71,0.08)] pointer-events-none z-[3]" />
    </div>
  );
}
