/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/views/**/*.blade.php',
    './resources/js/**/*.{js,jsx}',
  ],
  corePlugins: {
    // We ship our own CSS reset in resources/css/app.css, so disable
    // Tailwind's preflight to avoid double resets / conflicts.
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        cream: '#F8F4EF',
        gold: '#AB8A43',
        'gold-light': '#C5A55C',
        'gold-deep': '#8A6E32',
        ink: '#181715',
        beige: '#D4C2B6',
      },
      fontFamily: {
        disp: ['"El Messiri"', 'serif'],
        body: ['Tajawal', 'sans-serif'],
        lat: ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
};
