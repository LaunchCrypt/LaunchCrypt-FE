/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textPrimary: '#e5e4fa',
        iconPrimary: '#d4c4ed',
      },
      content: {
        'before': '""',
        'after': '""',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      content: ['before', 'after'],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.before\\:content': {
          content: 'attr(data-before)',
        },
        '.after\\:content': {
          content: 'attr(data-after)',
        },
      }, ['before', 'after']);
    },
  ],
}