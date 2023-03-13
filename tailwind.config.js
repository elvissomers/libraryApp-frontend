/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-green': '#008200',
        'light-green' : '#00e600',
        'black': '#000000',
        'grey-800': '#5a5a5a',
        'grey-600': '#969696',
        'grey-400': '#c8c8c8',
        'grey-200': '#f0f0f0',
        'wit': '#ffffff'
      }
    },
  },
  plugins: [],
}
