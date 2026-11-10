# Vedant Yadav Pandilwad – Japanese Interactive Storytelling Portfolio

## Overview
A cinematic, scroll‑driven personal portfolio that blends Japanese watercolor illustrations with modern web technologies.  
The experience unfolds across **six beautifully painted scenes** that tell the story of Vedant’s journey, skills, projects, and philosophy.

| Scene | Image | Theme | Heading |
|------|-------|-------|---------|
| 01 | `Images/1.png` | `#B84C3D` (vermilion) | *Hello, I'm Vedant.* |
| 02 | `Images/2.png` | `#D9A66E` (amber) | *Beyond the Horizon.* |
| 03 | `Images/3.png` | `#718A8A` (water) | *Tools of Creation.* |
| 04 | `Images/4.png` | `#B84C3D` (vermilion) | *Things I've Built.* |
| 05 | `Images/5.png` | `#4B5047` (ink) | *Always Becoming.* |
| 06 | `Images/6.png` | `#B84C3D` (vermilion) | *Until Our Paths Cross Again.* |

The site uses **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **GSAP** for scroll‑triggered animations, **Lenis** for smooth scrolling, and **Lucide‑React** for icons.  All typography is loaded via Google Fonts with a fallback to locally‑defined CSS variables.

## Getting Started
```bash
# Clone (or place this folder) and install dependencies
npm install

# Development server (hot‑reload)
npm run dev
```
Open `http://localhost:3000` in a browser.  The site works on desktop, tablet and mobile; on touch devices the custom cursor is disabled and animation density is reduced.

## Build & Deploy
```bash
# Production build
npm run build

# Preview the built app locally
npm start
```
The build outputs to `.next/`.  Deploy to **Vercel** (or any Node host) by connecting the repository and selecting the default *Next.js* preset.  No extra environment variables are required.

## Project Structure
```
public/
  images/scenes/      ← copied watercolor assets (1‑6.png)
src/
  app/               ← Next.js app router (layout.tsx, page.tsx, globals.css)
  components/
    layout/          ← Navigation, PageIndicator
    scenes/          ← SceneManager, ChapterContent
    effects/         ← CustomCursor, Droplets, FloatingLeaves, ParallaxArtwork, WaterDistortion
    graphics/        ← JapaneseMotifs (HankoSeal, GithubIcon, EnsoCircle, SeigaihaPattern)
  data/              ← portfolioData.ts, chapters.ts
  hooks/             ← useLenis, useMousePosition
  lib/               ← GSAP wrapper
```

## Key Features
- **Diagonal Clip‑Path Scene Transitions** – GSAP timelines scrubbed to scroll progress.
- **Custom Vermilion Cursor** – subtle lag and hover expansion, hidden on touch devices.
- **Ambient Water Droplets & Sakura Petals** – continuous GSAP‑driven particles, density adapts to screen width.
- **Mouse‑Responsive Parallax** – layered art moves subtly based on pointer position.
- **Water Distortion Filter** – low‑overhead SVG turbulence for a watery ripple effect.
- **Responsive Typography** – fluid scaling, `prefers‑reduced‑motion` disables all GSAP animations.
- **Accessibility** – semantic headings, focus‑visible UI, ARIA labels on navigation.

## Accessibility & Reduced Motion
All GSAP animations check `window.matchMedia('(prefers-reduced-motion: reduce)')`.  When users prefer reduced motion, the site falls back to static content (no droplet, leaf, or scroll‑trigger animations).  The custom cursor is automatically disabled on mobile‑first devices.

## Adding More Scenes (Future Work)
The current repository contains six numbered watercolor illustrations (`1.png`–`6.png`).  If additional artwork becomes available, simply place the files in `public/images/scenes/` with the next numeric name, then add a new entry to `src/data/chapters.ts` mirroring the existing structure.  The `SceneManager` will automatically handle the new layer and transition.

---
*All content, images, and project links are taken directly from Vedant’s GitHub README.  No placeholder assets or invented achievements have been added.*

