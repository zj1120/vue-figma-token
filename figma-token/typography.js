const tokens = require('./tr-tokens.json')
const util = require('./util')
const list = Object.entries(tokens.global).filter(
  ([key, value]) => value?.type === 'typography'
)
const output = list.map(([key, { value }]) => {
  const mapVal = Object.entries(value).map(([k, val]) => {
    return [util.getKebabCase(k), `var(--${key}-${util.getKebabCase(k)})`]
  })
  return [`.${key}`, Object.fromEntries(mapVal)]
})
module.exports = Object.fromEntries(output)
