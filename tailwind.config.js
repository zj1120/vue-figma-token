const { filterTokensByType } = require('./figma-token/fns')
const plugin = require('tailwindcss/plugin')
const tokens = require('./figma-token/figma-output/blue.json')
const colors = filterTokensByType('color', tokens)
const globalTokens = require('./figma-token/figma-output/global.json')
const globalColors = filterTokensByType('color', globalTokens)
const fontWeights = filterTokensByType('fontWeights', globalTokens)
const lineHeights = filterTokensByType('lineHeights', globalTokens)
const fontSizes = filterTokensByType('fontSizes', globalTokens)
const textDecoration = filterTokensByType('textDecoration', globalTokens)
// const typography = filterTokensByType('typography', globalTokens)
const typography = require('./figma-token/typography')
const spacing = filterTokensByType('spacing', globalTokens)
const sizing = filterTokensByType('sizing', globalTokens)
const borderRadius = filterTokensByType('borderRadius', globalTokens)
const boxShadow = filterTokensByType('boxShadow', globalTokens)

module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...globalColors,
        ...colors
      },
      fontWeight: fontWeights.fontWeights,
      lineHeight: (theme) => ({
        ...theme('spacing'),
        ...lineHeights.lineHeights,
        ...spacing,
        ...sizing
      }),
      fontSize: (theme) => ({
        ...theme('spacing'),
        ...fontSizes.fontSizes
      }),
      textDecoration,
      spacing: (theme) => ({
        ...spacing,
        ...sizing
      }),
      sizing: (theme) => ({
        ...theme('inset'),
        ...sizing
      }),
      borderRadius: (theme) => ({
        ...theme('inset'),
        ...borderRadius
      }),
      boxShadow
    }
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents, e, prefix, config }) {
      addUtilities(typography)
    })
  ]
}
