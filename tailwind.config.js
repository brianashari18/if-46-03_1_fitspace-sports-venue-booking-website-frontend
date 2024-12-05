/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./src/assets/hero.png')",
      },
      colors: {
        'primary': '#738FFD',
      },
      boxShadow: {
        'inner-dark': 'inset 5px 5px 15px 10px rgba(0, 0, 0, 0.15)',
        '3xl': ' 5px 5px 15px 10px rgba(0, 0, 0, 0.15)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
