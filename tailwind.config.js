/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}"
  ],
  darkMode: "class",
  theme: {
    colors: {
      "white": "hsl(0, 0%, 100%)",
      "darkElement": "hsl(209, 23%, 22%)",
      "darkBg": "hsl(207, 26%, 17%)",
      "darkGray": "hsl(0, 0%, 52%)",
      "lightGray": " hsl(0, 0%, 98%)"
    },
    extend: {},
  },
  plugins: [],
}

