/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'QuickStand': ["Quicksand", 'sans-serif'],
        'Roboto': ["Roboto", 'sans-serif'],
      },
      colors:{
        main: {
          100: '#00BCD4',
          200: '#B2EBF2',
          300: '#00838F'
        },
        secondary: {
          100: '#FFA000',
          200: '#FFECB3',
          300: '#FF6F00'
        },
        Accent: {
          '100': '#e91e63',
          '200': '#f8bbd0',
          '300': '#ad1457'
        }
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}

