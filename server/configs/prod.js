"use strict"
const path = require('path'),
      serverRoot = path.dirname(__dirname),
      root = path.resolve(serverRoot, '../'),
      staticDir = path.join(root, 'static'),
      dev = require('./dev.js'),
      fs = require('fs'),
      _ = require('lodash');

let config = {
  app: {
    name: 'ux-research',
    port: 3000,
    adminPath: '/api'
  },
  website: {
    reportsType: ['Bing', 'Cortana', 'Bot']
  },
  debug: true,
  env: 'production',
  mongoConfig: {
    url: 'mongodb://localhost:27017/ux-research',
    opts: {
      user: '',
      pass: ''
    }
  },
  jwt: {
    cert: 'dinglei'
  },
  dir: {
    root,
    log: path.join(__dirname, '..', 'logs'),
    server: serverRoot,
    static: staticDir,
    resource: path.join(serverRoot, 'resource'),
    upload: path.join(serverRoot, 'resource', 'upload')
  }
}

if(process.env.NODE_ENV === 'development') {
  config = _.merge(config, dev)
}

if(process.env.NODE_ENV === 'production') {
  if(fs.existsSync(__dirname+'/private.js')){
    config = _.merge(config,require('./private.js'));
  }
}

module.exports = config
