import Typography from "typography"

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.666,
  headerFontFamily: ["Spartan", "Arial", "sans-serif"],
  bodyFontFamily: ["Spartan", "serif"],
  googleFonts: [
    {
      name: "Spartan",
      styles: ["100", "200", "300", "400", "400i", "700", "700i"],
    },
  ],
})

// Export helper functions
export const { scale, rhythm, options } = typography
export default typography
