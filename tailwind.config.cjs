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
      screens: {
        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // // => @media (min-width: 1024px) { ... }

        xl: '1480px',
        // // => @media (min-width: 1480px) { ... }

        '2xl': '1836px',
        // => @media (min-width: 1536px) { ... }

        'max-2xl': { max: '1535px' },
        // => @media (max-width: 1535px) { ... }

        'max-xl': { max: '1279px' },
        // => @media (max-width: 1279px) { ... }

        'max-lg': { max: '1023px' },
        // => @media (max-width: 1023px) { ... }

        'max-md': { max: '767px' },
        // => @media (max-width: 767px) { ... }

        'max-sm': { max: '639px' },
        // => @media (max-width: 639px) { ... }
      },
      fontFamily: {
        customFont: ['"Quicksand"', 'sans-serif'],
        serif: ['"Source Serif Pro"', 'serif'],
        fontName: ["'Dancing Script'", 'cursive'],
        fontSecons: ['"Great Vibes"', 'cursive'],
      },

      backgroundColor: {
        'dark-blue': '#252B42',
        'dark-red': '#4A1111',
        'light-gray': '#FAFAFA',
        'light-pink': '#FFE5DD',
        'blue-500': '#3649F9',
        'red-500': '#C91522',
        'green-500': '#00B980',
        'purple-500': '#5D36F9',
        'dark-pink': '#FCC0AD',
        'blue-gray-500': '#11284A',
        'orange-500': '#FF7240',
        'light-purple': '#8D96A1',
      },
      colors: {
        'red-500': '#C91522',
        'light-purple': '#8D96A1',

        'blue-gray-500': '#11284A',
        'orange-500': '#FF7240',
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
        success: '#28a745',
        error: '#E10011',
      },
      boxShadow: {
        'md-2': '0 6px 8px -2px rgba(0, 0, 0, 0.1)',
      },
      fontWeight: {
        thin: '100',
        hairline: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        'extra-bold': '800',
        black: '900',
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
});
