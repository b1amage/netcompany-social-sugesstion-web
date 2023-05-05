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
          200: "#B90D0D",
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
      keyframes: {
        moveInLeft: {
          "0%": {
            opacity: 0,
            transform: "translateX(-10rem)",
          },
          "50%": {
            transform: "translateX(1rem)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
        moveInRight: {
          "0%": {
            opacity: 0,
            transform: "translateX(10rem)",
          },
          "50%": {
            transform: "translateX(-1rem)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
        moveInBottom: {
          "0%": {
            opacity: 0,
            transform: "translateY(3rem)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        zoom: {
          "0%": {
            opacity: 0.2,
            transform: "scale(0.2)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },
      },
      animation: {
        moveInLeft: "moveInLeft 1.2s ease-in-out",
        moveInRight: "moveInRight 1.2s ease-in-out",
        moveInBottom: "moveInBottom 1.2s ease-out",
        moveInBottomDelay: "moveInBottom 1.8s ease-out",
        zoom: "zoom 1s ease",
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [],
};
