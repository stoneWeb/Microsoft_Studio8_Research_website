"use strict"
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  authority: {
    type: Number,
    default: 10
  },
  time: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('user', userSchema)
