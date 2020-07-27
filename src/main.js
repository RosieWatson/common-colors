#! /usr/bin/env node
const chalk = require('chalk')
const fs = require('fs')

const hexValueRegex = /\#[a-z, A-Z, 0-9]+\;/g;
const styleFileRegex = /\.css|\.less|\.sass|\.scss/g;

function start() {
  const colors = []

  fs.readdir('./', (err, files) => {
    if (err) throw err
  
    files.forEach(file => {
      if (!file.match(styleFileRegex)) return
  
      const fileContent = fs.readFileSync(file,'utf8')
      const fileColors = parseColors(fileContent)

      colors.push(...fileColors)
    })

    const colorFreqs = getColorFrequency(colors)
    const mostFreqColor = getMostFrequentColor(colorFreqs)

    if (mostFreqColor.length === 0) console.log('You don\'t seem to be using any HEX colors in your repo')
    else if (mostFreqColor.length === 1) console.log('Your most frequently used color is:', chalk.hex(mostFreqColor)(mostFreqColor))
    else if (mostFreqColor.length > 1) mutliColorMessage(mostFreqColor)
  })
}

function parseColors(fileContent) {
  return fileContent.match(hexValueRegex)
}

function getColorFrequency(colors) {
  const frequencies = {}

  colors.forEach(color => {
    if(!frequencies[color]) frequencies[color] = 1
    else ++frequencies[color]
  })

  return frequencies
}

function getMostFrequentColor(frequencies) {
  const freqs = Object.values(frequencies).sort((a, b) => b - a)
  const highestFreq = freqs[0]
  return getKeyByValue(frequencies, highestFreq)
}

function getKeyByValue(object, value) {
  return Object.keys(object).filter(key => object[key] === value)
}

function mutliColorMessage(colors) {
  console.log('Your most frequently used colors are:')
  colors.forEach(color => {
    console.log(chalk.hex(color)(color))
  })
}

start()
