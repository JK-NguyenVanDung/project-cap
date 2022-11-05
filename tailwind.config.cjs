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
        'light-gray': '#FAFAFA',
        'light-pink': '#FFE5DD',

        'dark-pink': '#FCC0AD',
      },
      colors: {
        'dark-blue': '#252B42',
        primary: '#3649F9',
        dark: '#000000',
        light: '#ffffff',
        'light-blue': '#BCC8D8',
        'light-gray': '#FAFAFA',
        'light-pink': '#FFE5DD',

        'dark-pink': '#FCC0AD',
        'dark-gray': '#BFC0C1',
        error: '#E10011',
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
})
