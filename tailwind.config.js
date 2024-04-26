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
      "search-color": "#f5f7fa",
      black: "black",
      "edit-input-color": "#eeeeee",
    },
    extend: {
      fontFamily: {
        rubik: ['"Rubik"', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        sm: "repeat(2, minmax(0, 18rem))",
        lg: "repeat(3, minmax(0, 18rem))",
        xl: "repeat(4, minmax(0, 18rem))",
        "2xl": "repeat(5, minmax(0, 18rem))",
        "3xl": "repeat(5, minmax(0, 18rem))",
        edit: "2fr 1fr",
      },
    },
  },
  plugins: [require("daisyui")],
};
