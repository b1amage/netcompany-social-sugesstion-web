/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  screens: {
    sm: "480px",
    md: "768px",
    lg: "1284px",
    xl: "1440px",
  },
  theme: {
    extend: {
      colors: {
        primary: {
          800: "#080817",
          400: "#0F2147",
        },
        secondary: {
          400: "#E35F52",
          200: "#FF7D70",
        },
        teriary: {
          400: "#5CBCA9",
        },
      },
      keyframes: {},
      animation: {},
    },
    fontFamily: {},
  },
  plugins: [],
};
