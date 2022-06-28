/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
      colors: {
        "blue-dark": "#121829",
        blue: "#006DB7",
        "blue-light": "#007BFC",
        gray: "#DDDEE0",
        purple: "#E6E5FF",
      },
    },
  },
  plugins: []
};
