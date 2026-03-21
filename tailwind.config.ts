import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef7ff",
          100: "#d7ecff",
          200: "#b7ddff",
          300: "#86c6ff",
          400: "#4ea5ff",
          500: "#1f7cff",
          600: "#105de6",
          700: "#1248b6",
          800: "#173f8d",
          900: "#193871"
        },
        accent: "#ff7a59",
        surface: "#f7f7f3",
        ink: "#161618"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.12)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(31, 124, 255, 0.18), transparent 35%), radial-gradient(circle at top right, rgba(255, 122, 89, 0.18), transparent 30%)"
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
