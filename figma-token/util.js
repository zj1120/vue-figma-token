function getCamelCase(str) {
  const newStr = str.replace(/-([a-z])/g, function(all, i) {
    return i.toUpperCase()
  })
  return newStr.slice(0, 1).toUpperCase() + newStr.slice(1)
}

function getKebabCase(str) {
  const newStr = str.replace(/[A-Z]/g, function(i) {
    return '-' + i.toLowerCase()
  })
  return newStr.slice(0, 1) === '-' ? newStr.slice(1) : newStr
}

module.exports = {
  getCamelCase,
  getKebabCase
}
