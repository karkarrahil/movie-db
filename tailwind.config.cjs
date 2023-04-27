const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'custom':"url('')"
      }
    },
    screens: {
      'xs': '420px',
      // => @media (min-width: 420px) { ... }
      ...defaultTheme.screens

   
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}