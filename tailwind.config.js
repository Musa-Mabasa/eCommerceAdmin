/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      "primary-color": "#01bbab",
      "secondary-color": "#00a3b8",
      whiteSmoke: "whiteSmoke",
      blue: "blue",
      white: "white",
      red: "#D22B2B",
      "sidebar-item": "rgb(255,255,255, 0.3)",
      "search-color": "#f5f7fa",
      black: "black",
      "edit-input-color": "#eeeeee",
      grey: "darkgrey",
      green: "green",
    },
    extend: {
      fontFamily: {
        rubik: ['"Rubik"', ...defaultTheme.fontFamily.sans],
        "rubik-scribble": ["Rubik Scribble", "system-ui"],
        "rubik-glitch": ["Rubik Glitch Pop", "system-ui"],
        "rubik-doodle": ["Rubik Doodle Shadow", "system-ui"],
      },
      gridTemplateColumns: {
        edit: "2fr 1fr",
      },
      animation: {
        fade: "fadeIn 2s ease-in",
      },
      keyframes: () => ({
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 0.8 },
        },
      }),
      display: ["group-hover"],
    },
  },
  plugins: [require("daisyui")],
};
