/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#8b5cf6', // Purple
        secondary: '#ec4899', // Pink
        dark: '#1f2937', // Dark Gray
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 