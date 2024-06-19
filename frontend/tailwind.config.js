/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('/banner.png')"
      },
      colors: {
        primary: '#F27280',
        primaryBg: '#F27280'
      }
    }
  },
  // eslint-disable-next-line no-undef
  plugins: [require('@tailwindcss/line-clamp')]
}
