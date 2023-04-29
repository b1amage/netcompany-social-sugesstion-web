/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  theme: {
    extend: {
      colors: {
        primary: {
          800: "#080817",
          400: "#0E1F42",
          200: "#B90D0D"
        },
        secondary: {
          400: "#E35F52",
          200: "#FF7D70",
        },
        teriary: {
          400: "#5CBCA9",
        },
        neutral: {
          200: "#F2F2F6",
          300: "#f5f5f5",
          400: "#E6E6EA",
          600: "#7E7E82",
        },
      },
      keyframes: {},
      animation: {},
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [],
};
