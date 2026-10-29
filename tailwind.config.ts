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
          bg: "#071321",
          secondary: "#0B1827",
          card: "#101F30",
          "card-hover": "#14273D",
          cyan: "#36D7F5",
          "cyan-hover": "#5EE2FA",
          "cyan-dark": "#1AA5C4",
          text: "#F4F7FB",
          muted: "#B7C5D6",
          border: "rgba(115, 160, 190, 0.22)",
          "border-bright": "rgba(54, 215, 245, 0.4)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        "cyan-glow": "0 0 25px -5px rgba(54, 215, 245, 0.35)",
        "cyan-glow-sm": "0 0 15px -3px rgba(54, 215, 245, 0.25)",
        "card-depth": "0 10px 30px -10px rgba(3, 8, 15, 0.8)",
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
