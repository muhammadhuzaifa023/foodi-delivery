/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#39DB4A",
        red: "#FF6868",
        secondary: "#555",
        primary: "#FCFCFC",
      },
      fontFamily: {
        primary: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ff0000", // Replace with your desired colors
          secondary: "#00ff00",
          accent: "#0000ff",
          neutral: "#f0f0f0",
          "base-100": "#ffffff", // Background color ko yahan define karein
        },
      },
    ],
  },
  
};
