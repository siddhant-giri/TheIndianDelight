const tailwindcss = require('tailwindcss')



module.exports = {


  plugins: [
    tailwindcss('./tailwind.config.js'),
    require('autoprefixer')
    // require("daisyui")
  ],

  // theme: {
  //   extend: {
  //     colors: {
  //       primary : '#DCCA87',
  //       secondary : {
  //         100 : '#222222',
  //         200 : '#ffffff'
  //       }
  //     },
  //     fontFamily : {
  //       montez : ['Montez'],
  //       outfit : ['Outfit']
  //     }
  //   },
  // },

}
