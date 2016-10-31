"use strict"
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
const report = new Schema({
    title: String,
    time: {
      type: Date,
      default: Date.now
    },
    goal: String,
    methods: String,
    filelink: String,
    researcher: String,
    keywords: [{
      type: Schema.Types.ObjectId,
      ref: 'keyword'
    }],
    category: Number
},{ versionKey: false, skipVersioning: { keyword: true }})
report.set('toJSON', { getters: true, virtuals: true});
report.set('toObject', { getters: true, virtuals: true});
/*
report.path('time').get(function (v) {
  return new Date(v).format('yyyy-MM-dd hh:mm:ss');
});
*/
module.exports = mongoose.model('report', report);
