import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#14161C",
          800: "#1D2027",
          700: "#2B2E38",
          500: "#4B4F5C",
        },
        paper: {
          DEFAULT: "#F6F3EC",
          100: "#FFFFFF",
        },
        brass: {
          DEFAULT: "#B08D57",
          600: "#96723F",
          100: "#EFE6D3",
        },
        rust: "#A8563B",
        moss: "#5C7A5E",
        line: "#DAD4C5",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
export default config;