"use strict"
const token = require('./token')
const keywords = require('./keywords')
const reports = require('./reports')
const users = require('./users')
const config = require('../configs/prod')

module.exports.init = function* (router){
  yield token.init(router);
  users.init(router);
  keywords.init(router);
  reports.init(router);
  router.get('/config', function(){
    this.status = 200
    this.body = config.website
  })
}
