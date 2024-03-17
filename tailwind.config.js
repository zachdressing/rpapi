/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    fontFamily: {
      'mainFont': ['Dekko', 'cursive']
    },
    extend: {
      backdropBrightness: {
        40: '.40',
      },
      backgroundImage: {
        bgImg: "url('../src/Assets/pokemartLogo.png')"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
