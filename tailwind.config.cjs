/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  mode: "jit",
<<<<<<< HEAD
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: theme => theme('colors'),
      textColor: {
        'success': '#',
      }
    },
  },
  variants: {
    extend: {},
=======
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "dark-blue": "#252B42",
      },
    },
>>>>>>> 77eee5c682a9b843ffdc9b36da8b1ed5fb142c94
  },
  plugins: [require("flowbite/plugin")],
};
