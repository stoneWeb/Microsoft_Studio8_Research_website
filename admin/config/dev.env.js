var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  api:'"http://leis-mbp.guest.corp.microsoft.com:3000/api/"'
})
