import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F6E8CF] text-ink-900 px-6">
      <h1 className="font-serif text-4xl mb-4">404 - Page Not Found</h1>
      <p className="font-sans text-sm text-ink-700/80 mb-6">
        The requested passage drifts beyond the mountain mist.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-vermilion-500 text-parchment-100 text-xs uppercase tracking-widest font-bold hover:bg-vermilion-600 transition-colors"
      >
        Return to the Mountain
      </Link>
    </div>
  );
}

