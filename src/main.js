#! /usr/bin/env node
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

    console.log('Your most frequently used color is: ', mostFreqColor)
  })
}

function parseColors(fileContent) {
  return fileContent.match(hexValueRegex)
}

function getColorFrequency(colors) {
  const frequencies = {}

  colors.forEach(color => {
    if(!frequencies[color]) {
      frequencies[color] = 1
    } else {
      ++frequencies[color]
    }
  })

  return frequencies
}

function getMostFrequentColor(frequencies) {
  const freqs = Object.values(frequencies).sort((a, b) => b - a)
  const highestFreq = freqs[0]
  return getKeyByValue(frequencies, highestFreq)
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

start()

// Need to deal with no colours
// Need to deal with one highest
// Need to deal with many highest
// Would be nice to say if everything is used once
