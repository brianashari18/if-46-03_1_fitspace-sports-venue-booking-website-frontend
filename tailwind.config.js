/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 4px 6px rgba(0, 0, 255, 0.5)'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('./src/assets/hero.png')",
      },
      colors: {
        'primary': '#738FFD',
<<<<<<< HEAD
        'primary2': '#E6FDA3',
        'hitam': '#333333',
      },
      image:{
        'logo': "url('./src/assets/yellow-logo.png')",
        'instagram': "url('./src/assets/instagram.png')",
        'facebook': "url('./src/assets/facebook.png')",
        'tiktok': "url('./src/assets/tiktok.png')",
        'twitter': "url('./src/assets/twitter.png')",
=======
      },
      boxShadow: {
        'inner-dark': 'inset 5px 5px 15px 10px rgba(0, 0, 0, 0.15)',
        '3xl': ' 5px 5px 15px 10px rgba(0, 0, 0, 0.15)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
>>>>>>> 3ad5f005cfacc6d8935faae3682ce2dcb825d09a
      },
    },
  },
  plugins: [],
}
