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
        brand: {
          bg: "#FFFFFF",
          secondary: "#F8FAFC",
          card: "#FFFFFF",
          "card-hover": "#F1F5F9",
          cyan: "#0284C7", // Vibrant corporate cyan / electric engineering blue with AAA contrast
          "cyan-hover": "#0369A1",
          "cyan-dark": "#075985",
          "cyan-light": "#E0F2FE", // Soft cyan tint for badges & tags
          text: "#0F172A", // Deep slate for high-contrast crisp typography
          muted: "#475569", // Professional secondary text slate
          border: "#E2E8F0", // Crisp light border
          "border-bright": "rgba(2, 132, 199, 0.4)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        "cyan-glow": "0 10px 25px -5px rgba(2, 132, 199, 0.25)",
        "cyan-glow-sm": "0 4px 15px -3px rgba(2, 132, 199, 0.2)",
        "card-depth": "0 10px 30px -10px rgba(15, 23, 42, 0.08)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
