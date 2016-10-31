"use strict"
const fs = require('fs'),
      files = fs.readdirSync(__dirname),
      mw = {};

for(let file of files){
  if(!/^\./.test(file) && file !== 'index.js'){
    const fileName = file.split('.')[0]
    mw[fileName] = require('./'+file)
  }
}
module.exports = mw
