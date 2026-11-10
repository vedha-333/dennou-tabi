export interface Chapter {
  id: string;
  number: string;
  kanji: string;
  romaji: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  theme: {
    accent: string;
    badgeBg: string;
    textTone: "dark" | "light";
  };
}

export const CHAPTERS: Chapter[] = [
  {
    id: "scene-1",
    number: "01",
    kanji: "序",
    romaji: "HAJIMARI",
    title: "Hello, I'm Vedant.",
    subtitle: "Building thoughtful digital experiences with precision, patience, and purpose.",
    imageSrc: "/images/scenes/1.png",
    imageAlt: "Japanese watercolor illustration of Mt. Fuji, distant pagoda, lake with red-crowned cranes and lotus blossoms",
    theme: {
      accent: "#B84C3D",
      badgeBg: "rgba(184, 76, 61, 0.12)",
      textTone: "dark",
    },
  },
  {
    id: "scene-2",
    number: "02",
    kanji: "志",
    romaji: "KOKOROZASHI",
    title: "Beyond the Horizon.",
    subtitle: "A journey bridging core computer science with human-centered product craft.",
    imageSrc: "/images/scenes/2.png",
    imageAlt: "Lakeside Japanese tea house pavilion warmly glowing in evening mist with cherry blossoms",
    theme: {
      accent: "#D9A66E",
      badgeBg: "rgba(217, 166, 110, 0.15)",
      textTone: "dark",
    },
  },
  {
    id: "scene-3",
    number: "03",
    kanji: "技",
    romaji: "WAZA",
    title: "Tools of Creation.",
    subtitle: "Disciplined mastery across languages, backend architecture, and machine intelligence.",
    imageSrc: "/images/scenes/3.png",
    imageAlt: "Bamboo forest with stone lanterns, gentle cascade stream and stairway to a torii gate",
    theme: {
      accent: "#718A8A",
      badgeBg: "rgba(113, 138, 138, 0.15)",
      textTone: "dark",
    },
  },
  {
    id: "scene-4",
    number: "04",
    kanji: "創",
    romaji: "SOZO",
    title: "Things I've Built.",
    subtitle: "Tangible software solving actual problems — voice AI, computer vision, algorithms & systems.",
    imageSrc: "/images/scenes/4.png",
    imageAlt: "Arched wooden bridge with glowing lanterns and waterwheel pavilion under warm sunset sky",
    theme: {
      accent: "#B84C3D",
      badgeBg: "rgba(184, 76, 61, 0.12)",
      textTone: "dark",
    },
  },
  {
    id: "scene-5",
    number: "05",
    kanji: "道",
    romaji: "MICHI",
    title: "Always Becoming.",
    subtitle: "Engineering with purpose: continuous growth, first-principles curiosity, and resilient design.",
    imageSrc: "/images/scenes/5.png",
    imageAlt: "Grand stone staircase ascending a misty mountain toward a mountaintop shrine and twin waterfalls",
    theme: {
      accent: "#4B5047",
      badgeBg: "rgba(75, 80, 71, 0.15)",
      textTone: "dark",
    },
  },
  {
    id: "scene-6",
    number: "06",
    kanji: "結",
    romaji: "MUSUBI",
    title: "Until Our Paths Cross Again.",
    subtitle: "Every meaningful journey begins with an open conversation. Let us build together.",
    imageSrc: "/images/scenes/6.png",
    imageAlt: "Calico cat sleeping calmly beside a glowing lantern on a wooden porch with torii gate on reflective lake",
    theme: {
      accent: "#B84C3D",
      badgeBg: "rgba(184, 76, 61, 0.15)",
      textTone: "dark",
    },
  },
];

