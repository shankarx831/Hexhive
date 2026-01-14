/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <--- This line is CRITICAL
  ],
  theme: {
    extend: {
      colors: {
        primary: '#004030', 
        'primary-light': '#005c45',
        accent: '#4A9782', 
        'accent-light': '#7bb8a6',
        cream: '#FFF9E5',
        light: '#DCD0A8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}