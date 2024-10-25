/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'black-night-rider': '#171717',
        'black-eclipse': '#212121',
        'white-whisper': '#ECECEC',
      }
    },
  },
  plugins: [],
};
