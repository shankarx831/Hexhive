/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <--- This line is CRITICAL
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#004030',
          light: '#007a5e',
          dark: '#00221a',
        },
        accent: {
          DEFAULT: '#4A9782',
          light: '#7bb8a6',
          dark: '#2a6d5a',
        },
        cream: '#FFF9E5',
        light: '#DCD0A8',
        dark: '#222222', // text-dark alias
        background: '#FFF9E5',
        text: {
          dark: '#222222',
          light: '#f0f0f0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}