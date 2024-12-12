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
        'primary2': '#E6FDA3',
        'hitam': '#333333',
      },
      image:{
        'logo': "url('./src/assets/yellow-logo.png')",
        'instagram': "url('./src/assets/instagram.png')",
        'facebook': "url('./src/assets/facebook.png')",
        'tiktok': "url('./src/assets/tiktok.png')",
        'twitter': "url('./src/assets/twitter.png')",
      },
    },
  },
  plugins: [],
}
