/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
      primaryColor: "#0067FF",
      yellowColor: "#FEB60D",
      purpleColor: "#9771FF",
      irisBlueColor: "#01B5C5",
      headingColor: "#181A1E",
      textColor: "#4E545F",
    },
    boxShadow: {
      panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;",
    },
    backgroundImage:{
      navBg:'url(/images/header-bg.png)',
      heroBg:'url(/images/hero-bg.png)',
      login:'url(/images/login-bg.jpg)',
      register:'url(/images/register-bg.jpg)'
    }
  
  },
  },
  plugins: [],
}