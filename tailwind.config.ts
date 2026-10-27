import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ember: {
          50: "#fff5f2",
          100: "#ffe6df",
          400: "#ff6b47",
          500: "#e84a27",
          600: "#d43815",
          700: "#a32208",
          900: "#4a1004",
        },
        gold: {
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
        obsidian: {
          950: "#070606",
          900: "#0d0b0a",
          800: "#161210",
          700: "#221c18",
          600: "#302722",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
        display: ["var(--font-cinzel)", "Cinzel", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
