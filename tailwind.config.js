module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter']
      },
      lineClamp: {
        4: 4,
        5: 5,
        6: 6
      }
    },
  },
  variants: {
    scrollbar: ['rounded'],
    extend: {
      ringWidth: ['hover'],
      ringColor: ['hover'],
      display: ['dark'],

    }
  },
  plugins: [
    require('tailwindcss-line-clamp'),
    require('tailwind-scrollbar'),
  ],
}
