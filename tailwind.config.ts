import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: "#FAF4EB",
          100: "#F6E8CF",
          200: "#EDD6B1",
          300: "#E3C293",
        },
        sage: {
          300: "#C4C9BF",
          500: "#A5ACA0",
          700: "#7A8275",
        },
        water: {
          300: "#98AFA8",
          500: "#718A8A",
          700: "#4D6363",
        },
        ink: {
          300: "#787F73",
          500: "#4B5047",
          700: "#32372F",
          900: "#1A1D19",
          deep: "#111411",
        },
        vermilion: {
          300: "#D36E60",
          500: "#B84C3D",
          700: "#943527",
        },
        amber: {
          300: "#E8BF8E",
          500: "#D9A66E",
          700: "#B98144",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-baskerville)", "Georgia", "serif"],
        sans: ["var(--font-dmsans)", "sans-serif"],
        jp: ["var(--font-noto-serif-jp)", "serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;

