import React from "react";

/**
 * Hanko (Japanese signature red stamp seal) for Vedant
 */
export function HankoSeal({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center border-2 border-vermilion-500 rounded p-1 select-none text-vermilion-500 font-jp tracking-widest text-[10px] leading-none uppercase bg-vermilion-500/10 shadow-sm ${className}`}
      title="Vedant's Seal"
    >
      <div className="flex flex-col items-center justify-center font-bold">
        <span>印</span>
        <span className="text-[7px] tracking-normal font-sans">VED</span>
      </div>
    </div>
  );
}

/**
 * Clean Crisp GitHub Vector Icon
 */
export function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/**
 * Clean Crisp LinkedIn Vector Icon
 */
export function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 1.66-1.66 1.66 1.66 0 0 0-1.66-1.66 1.66 1.66 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

/**
 * Enso Zen brush circle SVG
 */
export function EnsoCircle({ className = "w-24 h-24 text-vermilion-500" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`opacity-60 ${className}`}
    >
      <path
        d="M 50,10 A 40,40 0 1,1 18,30"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="280"
        strokeDashoffset="10"
        fill="none"
      />
      <circle cx="50" cy="50" r="2.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Traditional Japanese Seigaiha (Blue Ocean Waves) subtle background SVG pattern
 */
export function SeigaihaPattern({ className = "w-full h-full opacity-5" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <pattern id="seigaiha" width="60" height="30" patternUnits="userSpaceOnUse">
          <path
            d="M 0 30 A 30 30 0 0 1 60 30 M 10 30 A 20 20 0 0 1 50 30 M 20 30 A 10 10 0 0 1 40 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M 30 0 A 30 30 0 0 1 90 0 M 40 0 A 20 20 0 0 1 80 0 M 50 0 A 10 10 0 0 1 70 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#seigaiha)" />
    </svg>
  );
}
