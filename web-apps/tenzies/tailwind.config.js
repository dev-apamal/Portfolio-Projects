/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        customBlueGray: '#0B2434',
        buttonColor: '#5035FF',
      },
    },
  },
  plugins: [],
}

