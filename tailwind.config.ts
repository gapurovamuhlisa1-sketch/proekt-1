import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#080B1F",
          900: "#0D1236",
          850: "#101637",
          800: "#141B4D",
          700: "#1E2A78",
          600: "#2E3AAB",
          500: "#4F5BD5",
          400: "#7F77DD",
          300: "#AFA9EC",
          200: "#CECBF6",
          100: "#E4E2FB",
        },
        line: {
          DEFAULT: "#1e2650",
          strong: "#3a4180",
        },
        muted: "#6b74a3",
        soft: "#9aa3d0",
        gold: "#EF9F27",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "ink-hero":
          "linear-gradient(160deg, #1E2A78 0%, #141B4D 45%, #080B1F 100%)",
        "ink-cta": "linear-gradient(120deg, #141B4D 0%, #2E3AAB 100%)",
        "ink-btn": "linear-gradient(90deg, #7F77DD 0%, #4F5BD5 100%)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "70%": { transform: "scale(1.35)", opacity: "0" },
          "100%": { transform: "scale(1.35)", opacity: "0" },
        },
        "check-in": {
          from: { transform: "scale(0.4)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.24,0,0.38,1) infinite",
        "check-in": "check-in 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
