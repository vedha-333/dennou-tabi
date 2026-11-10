import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vedant Yadav Pandilwad | Japanese Interactive Storytelling Portfolio",
  description: "Computer Science Student | AI & ML Developer | Problem Solver — Exploring the intersection of backend systems, computer vision, and thoughtful digital experiences.",
  authors: [{ name: "Vedant Yadav Pandilwad" }],
  keywords: [
    "Vedant Yadav Pandilwad",
    "Portfolio",
    "Computer Science",
    "AI",
    "Machine Learning",
    "Full-Stack Developer",
    "Computer Vision",
    "Next.js",
    "GSAP",
    "Storytelling Portfolio",
  ],
  openGraph: {
    title: "Vedant Yadav Pandilwad | Interactive Japanese Portfolio",
    description: "An interactive storytelling journey through software engineering, AI/ML, and computational craftsmanship.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#F6E8CF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Noto+Serif+JP:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body text-ink-900 bg-parchment-100 min-h-screen selection:bg-vermilion-500 selection:text-parchment-50 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
