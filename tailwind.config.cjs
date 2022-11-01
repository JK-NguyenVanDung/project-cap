const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  darkMode: 'class',
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        customFont: ['"Montserrat"', 'sans-serif'],
      },
      backgroundColor: {
        'dark-blue': '#252B42',
      },
      textColor: (theme) => theme('colors'),
      textWhile: {
        while: '#ffffff',
      },
      textHover: {
        hover: '#252b42',
      },
      listStyleType: {
        none: 'none',
        square: 'square',
        roman: 'upper-roman',
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
})
