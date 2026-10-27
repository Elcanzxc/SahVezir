/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        board: {
          light: '#e2d6b5',
          dark: '#b88b4a',
          lightHover: '#ece2c6',
          darkHover: '#c79958',
        }
      }
    },
  },
  plugins: [],
};

