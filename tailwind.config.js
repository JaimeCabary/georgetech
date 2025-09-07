
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#8B0000',
          light: '#FF4500'
        },
        secondary: '#FF8C00',
        dark: {
          100: '#1a1a1a',
          200: '#2d2d2d',
          300: '#404040',
        }
      }
    },
  },
  plugins: [],
}