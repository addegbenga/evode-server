module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "lenx-bg": "#F5F5F5",
        "lenx-bg-secondary": "#393E46",
        "lenx-primary": "#B3E6E9",
        "lenx-text-primary": "#FF7538",
        "lenx-gray-100": "#C4C5C8",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
