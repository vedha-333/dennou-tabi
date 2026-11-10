"use client";

import React, { useRef, useState } from "react";

interface TactileCardProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
}

/**
 * TactileCard - Tactile Japanese 3D Card inspired by ThreeUI Koi Studies
 * Features:
 * - CSS 3D depth and responsive pointer tilt
 * - Hairline multi-stop gradient border with subtle glass refraction
 * - Soft layered ambient shadows
 * - Smooth spring-back on cursor exit
 */
export default function TactileCard({
  children,
  className = "",
  accentColor = "#B84C3D",
}: TactileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return; // Touch screens keep surface flat for steady reading
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Subtle, elegant 3D tilt
    setTilt({
      x: -normY * 6.5,
      y: normX * 6.5,
    });

    setLightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      style={{ perspective: "1000px" }}
      className="w-full flex justify-center"
    >
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className={`relative w-full rounded-[26px] bg-[#FAF4E8]/96 text-ink-900 overflow-hidden select-text transition-transform duration-200 ease-out ${className}`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? "12px" : "0px"})`,
          boxShadow: isHovered
            ? "0 28px 60px -14px rgba(26, 29, 25, 0.18), 0 0 0 1px rgba(75, 80, 71, 0.14)"
            : "0 18px 44px -12px rgba(26, 29, 25, 0.11), 0 0 0 1px rgba(75, 80, 71, 0.10)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Dynamic Light Sheen tracking cursor */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[26px]"
          style={{
            background: `radial-gradient(circle 380px at ${lightPos.x}% ${lightPos.y}%, rgba(255, 255, 255, 0.45), transparent 70%)`,
            opacity: isHovered ? 1 : 0,
            zIndex: 1,
          }}
        />

        {/* Koi Studies style hairline gradient border */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[26px] pointer-events-none p-[1px]"
          style={{
            background: `linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(246, 236, 218, 0.4) 40%, rgba(75, 80, 71, 0.1) 70%, ${accentColor}33 100%)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            zIndex: 2,
          }}
        />

        {/* Card Content with 3D elevation */}
        <div className="relative z-10 p-5 sm:p-8 md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}

