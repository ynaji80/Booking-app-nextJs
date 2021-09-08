module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'body':["Lato",'sans-serif'],
        'roboto':["Roboto",'sans-serif'],
        'poppings':["Poppings",'sans-serif'],
        'niramit':["Niramit",'sans-serif']
    },
      boxShadow: {
        '5xl': '20px 20px 20px rgba(0,0,1,0.5)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
