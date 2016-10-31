"use strict"
const jwt = require('jsonwebtoken'),
      configs = require('../configs/prod'),
      utils = require('../utils/index'),
      mw = require('../middlewares/index'),
      md5 = require('md5');

const cert = configs.jwt.cert;
const User = require('../models/user');

module.exports.init = function* (router){
  yield seed;
  router.post('/tokens', create);
  router.get('/tokens/check', mw.verify_token, check);
}

function* seed(){
  let user = yield User.find().exec().catch(err => {
    utils.logger.error(err);
    throw(new Error('数据seed失败,请debug后重新启动'));
  });
  if(0 === user.length){
    user = new User({
      name: 'admin',
      username: 'admin',
      authority: 1,
      password: md5('password').toUpperCase(),
      time: new Date()
    })
    yield user.save().catch(err => {
      utils.logger.error(err);
      throw(new Error('数据seed失败,请debug后重新启动'));
    })
  }
}

function* create(next){
  console.log(this.request);
  const username = this.request.body.username
  const password = this.request.body.password
  let user = yield User.findOne({
    username,
  }).exec();
  if(user !== null){
    if(user.password === md5(password).toUpperCase()){
      const token = jwt.sign({
        uid: user._id,
        username: user.username,
        authority: user.authority,
        exp: Math.floor(Date.now()/1000) + 24 * 60 * 60
      }, cert);
      utils.print(token);
      this.status = 200;
      this.body = {
        success: true,
        data: {
          uid: user._id,
          name: user.name,
          username: user.username,
          authority: user.authority,
          token
        }
      }
    }else{
      this.throw(401, 'password error')
    }
  }else{
    this.throw(401, 'no this username')
  }
}

function* check(next){
  this.status = 200
  this.body = {
    success: true
  }
}
