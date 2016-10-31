"use strict"
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const keyword = new Schema({
    name: String,
    count: {
      type: Number,
      default: 0
    }
},{ versionKey: false})
keyword.set('toJSON', { getters: true, virtuals: true});
keyword.set('toObject', { getters: true, virtuals: true});
module.exports = mongoose.model('keyword', keyword);
