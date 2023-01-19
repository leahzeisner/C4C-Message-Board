/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {},
    textShadow: {
      'default': '4px 4px 4px rgba(255, 87, 51, 1)'
   }
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}