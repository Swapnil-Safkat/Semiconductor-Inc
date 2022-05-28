module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [ "dark",
      "cupcake",
    ],
  },
  plugins: [require("daisyui")],
}