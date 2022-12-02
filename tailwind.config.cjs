const withMT = require('@material-tailwind/react/utils/withMT');

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
        'dark-red': '#4A1111',
        'light-gray': '#FAFAFA',
        'light-pink': '#FFE5DD',
        'blue-500': '#3649F9',
        'red-500': '#D41B29',
        'green-500': '#00B980',
        'purple-500': '#5D36F9',
        'dark-pink': '#FCC0AD',
        'blue-gray-500': '#11284A',
      },
      colors: {
        'blue-gray-500': '#11284A',

        'border-gray': '#F0F0F0',
        'dark-blue': '#252B42', //  252B42
        primary: '#3649F9',
        dark: '#000000',
        light: '#ffffff',
        'light-blue': '#BCC8D8',
        'light-gray': '#FAFAFA',
        'light-pink': '#FFE5DD',
        'blue-500': '#3661F9',
        'purple-500': '#5D36F9',

        'dark-pink': '#FCC0AD',
        'dark-gray': '#BFC0C1',
        error: '#E10011',
      },
      boxShadow: {
        'md-2': '0 6px 8px -2px rgba(0, 0, 0, 0.1)',
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
});
