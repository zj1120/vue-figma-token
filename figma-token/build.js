const StyleDictionaryPackage = require('style-dictionary')
const { createArray } = require('./fns')

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

StyleDictionaryPackage.registerFormat({
  name: 'css/variables',
  formatter: function (dictionary, config) {
    return `${this.selector} {\n${dictionary.allProperties
      .map((prop) => `  --${prop.name}: ${prop.value};`)
      .join('\n')}\n}`
  }
})

StyleDictionaryPackage.registerTransform({
  name: 'sizes/px',
  type: 'value',
  matcher: function (prop) {
    // You can be more specific here if you only want 'em' units for font sizes
    return [
      'fontSizes',
      'spacing',
      'borderRadius',
      'borderWidth',
      'sizing',
      'lineHeights',
      'lineHeight',
      'fontSize'
    ].includes(prop.type)
  },
  transformer: function (prop) {
    // You can also modify the value here if you want to convert pixels to ems
    return parseFloat(prop.original.value) + 'px'
  }
})

StyleDictionaryPackage.registerTransform({
  name: 'boxShadow',
  type: 'value',
  matcher: function (prop) {
    return ['boxShadow'].includes(prop.type)
  },
  transformer: function (prop) {
    if (Array.isArray(prop.original.value)) {
      return prop.original.value.map(
        (p) =>
          `${p.x}px ${p.y}px ${p.blur}px ${p.spread}px ${p.color}${
            p.type === 'dropShadow' ? '' : ' inset'
          }`
      )
    }
    return `${prop.original.value.x}px ${prop.original.value.y}px ${
      prop.original.value.blur
    }px ${prop.original.value.spread}px ${prop.original.value.color}${
      prop.original.value.type === 'dropShadow' ? '' : ' inset'
    }`
  }
})

function getStyleDictionaryConfig(theme) {
  return {
    source: [`figma-token/tokens/${theme}.json`],
    format: {
      createArray
    },
    platforms: {
      web: {
        transforms: [
          'attribute/cti',
          'name/cti/kebab',
          'sizes/px',
          'boxShadow'
        ],
        buildPath: `figma-token/figma-output/`,
        files: [
          {
            destination: `${theme}.json`,
            format: 'createArray'
          },
          {
            destination: `${theme}.css`,
            format: 'css/variables',
            selector: theme === 'global' ? ':root' : `.${theme}-theme`
          }
        ]
      }
    }
  }
}

console.log('Build started...')

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS
;['global', 'standard', 'blue', 'red'].map(function (theme) {
  console.log('\n==============================================')
  console.log(`\nProcessing: [${theme}]`)

  const StyleDictionary = StyleDictionaryPackage.extend(
    getStyleDictionaryConfig(theme)
  )

  StyleDictionary.buildPlatform('web')

  console.log('\nEnd processing')
})

console.log('\n==============================================')
console.log('\nBuild completed!')
