/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ua: {
          red: '#AB0520',
          navy: '#0C234B',
          bg: '#F4F6F9',
        },
      },
      boxShadow: {
        soft: '0 16px 35px rgba(12, 35, 75, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
