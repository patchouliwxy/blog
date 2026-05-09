import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#baddfd",
          300: "#7ec2fc",
          400: "#3ba6f9",
          500: "#118bee",
          600: "#0071e3",
          700: "#0059b8",
          800: "#004a97",
          900: "#003d7a",
          950: "#002651",
        },
        neutral: {
          50: "#f5f5f7",
          100: "#e8e8ed",
          200: "#d2d2d7",
          300: "#aeaeb2",
          400: "#8e8e93",
          500: "#6e6e73",
          600: "#515154",
          700: "#3a3a3c",
          800: "#1c1c1e",
          900: "#1d1d1f",
          950: "#0a0a0a",
        },
      },
      boxShadow: {
        card: "0 0 0 0.5px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.04)",
        raised:
          "0 0 0 0.5px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08)",
        glass: "0 8px 32px rgba(0,0,0,0.06)",
      },
      backdropBlur: {
        glass: "20px",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
