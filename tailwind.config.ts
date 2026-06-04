import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#06060A",
          900: "#0A0A12",
          800: "#0F0F1A",
          700: "#161624",
        },
        surface: {
          DEFAULT: "#0E0E18",
          raised: "#13131F",
        },
        violet: {
          glow: "#7B5CFF",
        },
        cyan: {
          glow: "#21D4FD",
        },
        accent: {
          DEFAULT: "#7B5CFF",
          soft: "#9D86FF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #7B5CFF 0%, #21D4FD 100%)",
        "brand-radial":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(123,92,255,0.25), transparent)",
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(123,92,255,0.45)",
        "glow-cyan": "0 0 40px -10px rgba(33,212,253,0.4)",
        card: "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 20px 50px -20px rgba(0,0,0,0.8)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "border-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
        "border-flow": "border-flow 6s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
