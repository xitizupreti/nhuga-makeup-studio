import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Pink scale for the whole site. Swap these hex values once the studio
        // photos land and we pull the palette off them.
        blush: {
          50: "#fff5f8",
          100: "#ffe8ef",
          200: "#ffd0df",
          300: "#feadc5",
          400: "#fb7da4",
          500: "#f4548a",
          600: "#e0316d",
          700: "#bd1f56",
          800: "#9c1d49",
          900: "#821d41",
        },
        ink: "#3d2430",
        cream: "#fffafc",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
