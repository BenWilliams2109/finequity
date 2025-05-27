/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#1A1F71', // Visa's deep blue
            light: '#3241b2',
            dark: '#0a0f3d',
          },
          secondary: {
            DEFAULT: '#F7F8F9', // Light background
            dark: '#E6E9EC',
          },
          accent: {
            DEFAULT: '#00579F', // Secondary blue
          },
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }