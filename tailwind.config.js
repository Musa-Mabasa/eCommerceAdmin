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
      red: "red",
      "sidebar-item": "rgb(255,255,255, 0.3)",
    },
    extend: {
      fontFamily: {
        rubik: ['"Rubik"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("daisyui")],
};
