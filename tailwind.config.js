/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/ *.{ html, js }"],
  theme: {
    extend: {
      backgroundImage: {
        'like': "url('../img/like.png')",
        'like3': "url('../img/like3.png')",
        'generar': "url('../img/generar.png')",
        'desagrado': "url('../img/desagrado.png')",
        'sanFranciscoDesktop': "url('../img/sanFranciscoDesktop.jpg')",

      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#CC2D4A',
        'secondary': '#CC2D4A',
        'tertiary': '#61AEC9',
      }),
      textColor: {
        'primary': '#CC2D4A',
        'secondary': '#8FA206',
        'tertiary': '#61AEC9',
      },
      fontFamily: {
        Montserrat: ["Monserrat", "sans-serif"],
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require('@tailwindcss/aspect-ratio'),
  ],
}
