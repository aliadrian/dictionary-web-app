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
      "mildBlack": "hsl(0, 0%, 18%)",
      "darkElement": "hsl(209, 23%, 22%)",
      "darkBg": "hsl(207, 26%, 17%)",
      "darkerGray": "hsl(0, 0%, 23%)",
      "darkGray": "hsl(0, 0%, 52%)",
      "gray": "hsl(0, 0%, 92.5%)",
      "lightGray": "hsl(0, 0%, 96%)",
      "lighterGray": "hsl(0, 0%, 98%)",
      "purple": "hsl(275, 84.2%, 60.4%)",
      "lightPurple": "hsl(275, 77%, 90%)",
      "darkPurple": "hsl(272, 54%, 17%)"
    },
    extend: {
    }
  },
  plugins: [],
}

