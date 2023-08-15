/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:{
        'primary':'#fe001a',
        'black':'#000000'
      },
      fontFamily: {
       'poppins': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}

