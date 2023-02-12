/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      cyan: "#76DDDD",
      grey: "#585B7B",
    },
    extend: {
      fontFamily: {
        sansationB: [
          "SansationB",
          "Open Sans",
          ...defaultTheme.fontFamily.sans,
        ],
        sansationR: [
          "SansationR",
          "Open Sans",
          ...defaultTheme.fontFamily.sans,
        ],
        gothamBook: [
          "GothamBook",
          "Open Sans",
          ...defaultTheme.fontFamily.sans,
        ],
        gothamM: ["GothamM", "Open Sans", ...defaultTheme.fontFamily.sans],
        gothamB: ["GothamB", "Open Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
