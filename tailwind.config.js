/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#16a34a', // green-600
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 