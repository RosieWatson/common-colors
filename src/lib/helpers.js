const fs = require('fs')

const hexValueRegex = /\#[a-z, A-Z, 0-9]+\;/g;

const getColorFrequency = (colors) => {
  const frequencies = {}

  colors.forEach(color => {
    if(!frequencies[color]) frequencies[color] = 1
    else ++frequencies[color]
  })

  return frequencies
}

const getFiles = () => {
  return fs.readdirSync('./')
}

const getFileContents = (file) => {
  return fs.readFileSync(file,'utf8')
}

function getKeysByValue(object, value) {
  return Object.keys(object).filter(key => object[key] === value)
}

const parseColors = (fileContent) => {
  return fileContent.match(hexValueRegex)
}

module.exports = {
  getColorFrequency,
  getFiles,
  getFileContents,
  getKeysByValue,
  parseColors
}
