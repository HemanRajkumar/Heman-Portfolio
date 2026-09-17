/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0E14",
          soft: "#10141D",
          surface: "#151A24",
          line: "#232A38",
        },
        paper: {
          DEFAULT: "#F5F3EC",
          soft: "#ECE9DE",
          surface: "#FFFFFF",
          line: "#DAD5C4",
        },
        signal: {
          DEFAULT: "rgb(var(--signal) / <alpha-value>)",
          dim: "rgb(var(--signal-dim) / <alpha-value>)",
        },
        amber: {
          DEFAULT: "#FFB454",
        },
        muted: {
          dark: "#8B93A7",
          light: "#6B6552",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-dark":
          "linear-gradient(to right, #1A2029 1px, transparent 1px), linear-gradient(to bottom, #1A2029 1px, transparent 1px)",
        "grid-light":
          "linear-gradient(to right, #E5E1D3 1px, transparent 1px), linear-gradient(to bottom, #E5E1D3 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
    },
  },
  plugins: [],
};
