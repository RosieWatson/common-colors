#! /usr/bin/env node
const chalk = require('chalk')

const helpers = require('./lib/helpers')

const styleFileRegex = /\.css|\.less|\.sass|\.scss/g;

function start() {
  const colors = []
  const files = helpers.getFiles()
  
  files.forEach(file => {
    if (!file.match(styleFileRegex)) return

    const fileContent = helpers.getFileContents(file,'utf8')
    const fileColors = helpers.parseColors(fileContent)
    if (fileColors) colors.push(...fileColors)
  })

  const colorFreqs = helpers.getColorFrequency(colors)
  const mostFreqColors = getMostFrequentColors(colorFreqs)

  if (mostFreqColors.length === 0) console.log('You don\'t seem to be using any HEX colors in your repo')
  else if (mostFreqColors.length === 1) console.log('Your most frequently used color is:', chalk.hex(mostFreqColors)(mostFreqColors))
  else if (mostFreqColors.length > 1) mutliColorMessage(mostFreqColors)
}

function getMostFrequentColors(frequencies) {
  const freqs = Object.values(frequencies).sort((a, b) => b - a)
  const highestFreq = freqs[0]
  return helpers.getKeysByValue(frequencies, highestFreq)
}

function mutliColorMessage(colors) {
  console.log('Your most frequently used colors are:')
  colors.forEach(color => {
    console.log(chalk.hex(color)(color))
  })
}

start()

module.exports = { start }
