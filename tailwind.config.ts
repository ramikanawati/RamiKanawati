import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05060a",
          900: "#0a0c14",
          800: "#11141d",
          700: "#1a1d29",
          600: "#252938",
          500: "#3a3f52"
        },
        cyan: {
          glow: "#00d4ff",
          dim: "#0891b2"
        },
        emerald: {
          glow: "#10b981",
          dim: "#047857"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"]
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(0,212,255,0.15), transparent 60%)"
      },
      boxShadow: {
        "glow-cyan": "0 0 30px -5px rgba(0, 212, 255, 0.45)",
        "glow-emerald": "0 0 30px -5px rgba(16, 185, 129, 0.45)",
        "inner-glow": "inset 0 1px 0 0 rgba(255,255,255,0.06)"
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 12s linear infinite",
        marquee: "marquee 40s linear infinite",
        blink: "blink 1.1s steps(2, start) infinite",
        scan: "scan 3.5s linear infinite"
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" }
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" }
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
