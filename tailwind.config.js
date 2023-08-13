/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:{
        'primary':'#02C24A',
        'secondary':'#FCB914',
        'gray':'#848687'
      },
      fontFamily: {
       'poppins': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}

