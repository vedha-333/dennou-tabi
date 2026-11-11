<div align="center">

# 電 脳 の 旅 &bull; Dennou-Tabi
### *An Interactive Japanese Watercolor Storytelling Portfolio*

[![Live Demo](https://img.shields.io/badge/Live_Site-dennou--tabi.vercel.app-B84C3D?style=for-the-badge&logo=vercel&logoColor=white)](https://dennou-tabi.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-orange?style=for-the-badge)](https://lenis.darkroom.engineering/)

<br />

### 🌐 [Visit Live: dennou-tabi.vercel.app](https://dennou-tabi.vercel.app)

> *「千里の行も足下に始まる」*  
> *"A journey of a thousand miles begins with a single step."*

[Explore Passages](#-the-six-passages) &bull; [Key Highlights](#-key-engineering-highlights) &bull; [Tech Stack](#-tech-stack) &bull; [Project Structure](#-project-structure) &bull; [Local Setup](#-getting-started) &bull; [Author](#-author--connect)

<br />

---

</div>

## 🌊 Overview

**Dennou-Tabi (電脳の旅 — *Journey of the Mind*)** is a cinematic, scroll-driven interactive portfolio created for **Vedant Yadav Pandilwad**. Blending traditional Japanese watercolor art (*Washi* texture, Hanko seals, and ink-wash aesthetics) with cutting-edge web motion engineering, it transforms a conventional developer portfolio into an immersive, illustrated personal journey.

Rather than a static grid of resume bullet points, the portfolio unfolds as a living scroll across **six narrative chapters**, where high-performance GSAP scroll mechanics, fluid momentum physics, and tactile 3D cards guide the reader through Vedant's work in software engineering, AI/ML, and computational systems.

---

## 📜 The Six Passages

| Passage | Japanese Theme | Accent Color | Chapter Concept | Narrative & Focus |
|:---:|:---|:---:|:---|:---|
| **I** | **川の目覚め** *(The Awakening)* | `#B84C3D` <br> Vermilion | **The Source &bull; Before Sunrise** | Introduction, editorial biography, and Vedant's personal seal. |
| **II** | **志の光** *(Light of Purpose)* | `#D9A66E` <br> Warm Amber | **The Horizon &bull; Silent Study** | Core philosophy, engineering curiosity, and areas of study. |
| **III** | **技の竹林** *(Bamboo Grove)* | `#718A8A` <br> River Water | **The Grove &bull; Tools of Creation** | Technical skills categorized across AI/ML, Backend, Web, and Vision. |
| **IV** | **創造の橋** *(Bridge of Creation)* | `#B84C3D` <br> Vermilion | **The Watermill &bull; Things I've Built** | Verified projects: Voice AI, Touchless Computer Vision, and Algorithms. |
| **V** | **道の高み** *(The High Path)* | `#4B5047` <br> Deep Ink | **The Ascent &bull; Always Becoming** | The 4 core tenets: Craftsmanship, Rigor, Curiosity, and Balance. |
| **VI** | **結びの夕** *(Evening Binding)* | `#B84C3D` <br> Vermilion | **Epilogue &bull; The Remembered Current** | Farewell passage, collaboration invitation, GitHub & LinkedIn links. |

---

## ✨ Key Engineering Highlights

### 🏮 1. Washi Noren Opening Curtain
Upon visiting, readers are welcomed by an authentic **Japanese Noren curtain prologue** on textured washi paper featuring the Hanko seal (`[ 源 ]`), a live progress counter (`00% → 100%`), and a 2.5-second auto-reveal timer (with instant click-to-skip). When complete, the curtains part horizontally to reveal the watercolor world.

### 📜 2. Multiplane Parallax Artwork
Six hand-painted watercolor scenes are rendered on a fixed background canvas. As you scroll, expanding water-ripple circle masks blossom organically, accompanied by subtle counter-parallax depth zoom and settling rotations.

### 🧭 3. Asymmetric Pacing & Luxury Magnetic Snap
- **Reading Shelves:** Each chapter utilizes a sticky stage that locks content stationary for the first 58% of the scroll journey, allowing effortless reading without scroll drift.
- **Magnetic Snap:** Integrated GSAP ScrollTrigger snapping docks precisely to each section's exact scroll offset.
- **Subpixel Text Clarity:** Exit transitions utilize clean transform translations without blur filters to preserve razor-sharp ClearType text rendering.

### 🎴 4. Tactile 3D Cards (*Koi Studies Physics*)
Reading panels are housed in custom tactile cards featuring:
- Cursor-following light sheen and subtle 3D rotational tilt on desktop.
- Hairline multi-stop gradient borders with glass refraction.
- Automatic touch detection that stabilizes cards on mobile touch screens for jitter-free reading.

### 📱 5. Adaptive Mobile & Tablet Architecture
- **Desktop:** Elegant asymmetric layout (Passage I centered, odd passages on the left, even passages on the right).
- **Tablet & Mobile:** Automatically centers reading cards with balanced margins, wraps headlines gracefully without word breaking, and provides safe internal scrollbars (`custom-scrollbar`) so content is never clipped on shorter viewports.
- **Header:** Desktop displays all 6 interactive dot markers; mobile displays a compact passage pill with a full slide-down directory.

### 🌸 6. Organic Micro-Interactions
- **Liquid Custom Cursor:** Liquid lag physics with GSAP `quickTo`, expanding dynamically over interactive elements.
- **Tumbling Sakura Leaves:** Ambient petals drift across the river current with organic sinusoidal wind sway.
- **Water Ripple Click Effect:** Canvas ripples radiate on every button or navigation interaction.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Components & Static Site Generation)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict type safety, zero `any` shortcuts)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with customized Japanese parchment and mineral palettes
- **Animation Engine:** [GSAP 3](https://greensock.com/gsap/) (`ScrollTrigger`, `quickTo`, timeline scrubbing)
- **Kinetic Scrolling:** [@studio-freight/lenis](https://github.com/darkroomengineering/lenis) (Momentum smooth scroll)
- **Icons:** [Lucide React](https://lucide.dev/) + Handcrafted SVG Japanese motifs
- **Typography:** Cormorant Garamond, Libre Baskerville, DM Sans, and Noto Serif JP

---

## 📂 Project Structure

```bash
dennou-tabi/
├── public/
│   ├── favicon.svg             # Transparent vermilion Japanese "旅" favicon
│   ├── favicon.ico             # Multi-size raster favicon (32x32)
│   ├── apple-touch-icon.png    # High-resolution iOS touch icon
│   └── images/
│       ├── landing-washi.jpg   # Prologue Noren curtain paper texture
│       └── scenes/             # 6 Chapter watercolor illustrations
│           ├── 1.png           # Passage I: The Source
│           ├── 2.png           # Passage II: The Horizon
│           ├── 3.png           # Passage III: The Grove
│           ├── 4.png           # Passage IV: The Watermill
│           ├── 5.png           # Passage V: The Ascent
│           └── 6.png           # Passage VI: Epilogue
├── src/
│   ├── app/
│   │   ├── globals.css         # Parchment grain, scrollbar, and typography
│   │   ├── layout.tsx          # Metadata (Dennou-Tabi), viewport, fonts
│   │   ├── not-found.tsx       # Japanese 404 page
│   │   └── page.tsx            # Main application orchestrator
│   ├── components/
│   │   ├── effects/
│   │   │   ├── AtmosphericGlow.tsx   # Ambient river mist and sun glow
│   │   │   ├── CustomCursor.tsx      # Liquid water-ripple cursor follower
│   │   │   ├── FloatingLeaves.tsx    # Tumbling sakura petals
│   │   │   ├── ParallaxArtwork.tsx   # Multiplane depth art container
│   │   │   └── WaterDistortion.tsx   # SVG liquid surface turbulence
│   │   ├── graphics/
│   │   │   └── JapaneseMotifs.tsx    # Hanko seal, GitHub & LinkedIn vector marks
│   │   ├── layout/
│   │   │   ├── LandingPrologue.tsx   # 2.5s Washi Noren opening curtain
│   │   │   └── Navigation.tsx        # Masthead, passage indicators & mobile menu
│   │   ├── scenes/
│   │   │   ├── ChapterContent.tsx    # 6 story passage reading views & project cards
│   │   │   └── SceneManager.tsx      # Sticky stage, GSAP multiplane timelines & snapping
│   │   └── ui/
│   │       └── TactileCard.tsx       # 3D tilted parchment cards with light sheen
│   ├── data/
│   │   ├── chapters.ts         # Narrative passages and theme metadata
│   │   └── portfolioData.ts    # Vedant's projects, bio, skills, and links
│   ├── hooks/
│   │   └── useLenis.ts         # Smooth momentum scroll hook
│   └── lib/
│       └── gsap.ts             # GSAP registration & animation constants
├── next.config.mjs             # Next.js optimization configuration
├── tailwind.config.ts          # Custom Japanese color scales & typography
├── tsconfig.json               # TypeScript strict configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js:** v18.17.0 or higher
- **Package Manager:** `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vedha-333/dennou-tabi.git
   cd dennou-tabi
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open **[http://localhost:3000](http://localhost:3000)** in your browser.

4. **Run a production build:**
   ```bash
   npm run build
   npm start
   ```

---

## ☁️ Deployment

The portfolio is deployed and hosted on **Vercel**:

- **Live URL:** [https://dennou-tabi.vercel.app](https://dennou-tabi.vercel.app)
- **Deployment Platform:** [Vercel Edge Network](https://vercel.com/)
- **CI/CD:** Automatic continuous deployment on push to `main`.

---

## 👤 Author & Connect

**Vedant Yadav Pandilwad**  
*Computer Science Student &bull; AI & ML Developer &bull; Systems Craftsman*

- **Live Site:** [dennou-tabi.vercel.app](https://dennou-tabi.vercel.app)
- **GitHub:** [@vedha-333](https://github.com/vedha-333)
- **LinkedIn:** [vedant-pandilwad63724](https://www.linkedin.com/in/vedant-pandilwad63724/)
- **Repository:** [vedha-333/dennou-tabi](https://github.com/vedha-333/dennou-tabi)

---

<div align="center">
  <sub>一期一会 &bull; <i>Treasure every unrepeatable encounter.</i></sub>
</div>
