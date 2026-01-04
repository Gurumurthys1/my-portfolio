/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Figma Design Colors
        primary: {
          DEFAULT: '#C778DD', // Pink/Purple accent
          light: '#E9A6FF',
          dark: '#9D5FB8',
        },
        gray: {
          bg: '#282C33', // Main background
          dark: '#1E2127', // Darker sections
          light: '#ABB2BF', // Text gray
          border: '#363C43', // Borders
          
          // Light Mode Colors
          'light-bg': '#FDFCFF', // Soft Lavender/White tint
          'light-dark': '#F0EDF6', // Slightly darker lavender tint
          'light-text': '#282C33',
          'light-border': '#E5E5E5',
        },
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Fira Code', 'monospace'],
        mono: ['Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #C778DD 0%, #9D5FB8 100%)',
      },
    },
  },
  plugins: [],
}
