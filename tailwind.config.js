const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vt323: ["VT323", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        sm: ["20px", "20px"],
        base: ["24px", "24px"],
        lg: ["28px", "28px"],
        xl: ["36px", "32px"],
        "2xl": ["48px", "48px"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
