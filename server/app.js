"use strict"
const config = require('./configs/prod'),
      path = require('path'),
      co = require('co'),
      assert = require('assert'),
      app = require('koa')(),
      bodyParser = require('koa-bodyparser'),
      cors = require('koa-cors'),
      staticFiles = require('koa-static'),
      router = require('koa-router')({
        prefix: config.app.adminPath
      }),
      onerror = require('koa-onerror'),
      mongoose = require('mongoose'),
      jwt = require('jsonwebtoken'),
      controllers = require('./controllers/index'),
      utils = require('./utils/index');

mongoose.Promise = global.Promise;
jwt.co_verify = function(jwtString, secretOrPublicKey, options){
  return function(cb){
    jwt.verify(jwtString, secretOrPublicKey, options,cb);
  }
}

co(function*(){
  mongoose.connect(config.mongoConfig.url, config.mongoConfig.opts);
  app.context.config = config

  app.use(cors({
    maxAge: 7 * 24 * 60 * 60,
    credentials: true,
    methods: 'GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE',
    headers: 'Content-Type, Accept, Authorization'
  }))

  onerror(app);
  app.on('error', (err, ctx)=>{
    if((ctx.status === 404 && err.status === undefined) || err.status === 500){
      utils.logger.error('server error', err);
      utils.logger.error(ctx);
    }
    utils.print(err);
  })

  app.use(bodyParser())
  yield controllers.init(router)
  app.use(router.routes())
  app.listen(config.app.port, () => {
    utils.print('app is listening on port '+config.app.port);
  })
}).catch(err => {
  utils.print(err.stack);
})
