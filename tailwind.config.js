/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      "primary-color": "#20a3b8",
      "secondary-color": "#24bbab",
      whiteSmoke: "whiteSmoke",
      blue: "blue",
      white: "white",
      red: "red",
    },
    extend: {
      fontFamily: {
        rubik: ['"Rubik"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("daisyui")],
};
