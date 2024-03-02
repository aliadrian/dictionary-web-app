/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      "white": "hsl(0, 0%, 100%)",
      "black": "hsl(0, 100%, 0%)",
      "darkElement": "hsl(209, 23%, 22%)",
      "darkBg": "hsl(207, 26%, 17%)",
      "darkGray": "hsl(0, 0%, 52%)",
      "lightGray": "hsl(0, 0%, 92.5%)",
      "lighterGray": "hsl(0, 0%, 98%)",
      "purple": "hsl(275, 84.2%, 60.4%)"
    },
    extend: {
    }
  },
  plugins: [],
}

