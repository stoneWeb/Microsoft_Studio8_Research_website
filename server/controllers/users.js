"use strict"
const jwt = require('jsonwebtoken'),
      configs = require('../configs/prod'),
      utils = require('../utils/index'),
      mw = require('../middlewares/index'),
      md5 = require('md5');

const cert = configs.jwt.cert;
const User = require('../models/user');

module.exports.init = function(router){
  router.post('/users', mw.verify_token, create);
  router.get('/users/:id', getUser);
  router.get('/users', getUser);
  router.patch('/users/:id', mw.verify_token, updateUser);
}

function* getUser(){
  const id = this.params.id;
  let u;
  if(id){
    u = yield User.findOne({_id: id})
      .select('name username time authority')
      .exec().catch(err => {
          utils.logger.error(err);
          this.throw(500,'内部错误')
      })
  }else{
    u = yield User.find({})
      .select('name username time authority')
      .exec().catch(err => {
          utils.logger.error(err);
          this.throw(500,'内部错误')
      })
  }
  this.status = 200;
  this.body = {
    success:true,
    data:u
  }
}
function* create(){
  let currAuthority = this.user.authority
  let authority = this.request.body.authority || 10
  if(currAuthority >= authority){
    this.throw(400,'Account access is not enough')
  }
  let username = (this.request.body.username || "").trim(),
      name = (this.request.body.name || "").trim(),
      password = (this.request.body.password || "").trim();

  if(username.length < 5){
      this.throw(400,'用户名不够长')
  }else if(!name.length){
      this.throw(400,'请填写显示名')
  }else if(password.length < 6){
      this.throw(400,'密码不够长')
  }

  let u = yield User.findOne({username,}).exec().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
  })
  if(u != null){
      this.throw(400,'用户名已存在');
  }

  let user = new User({
    name,
    username,
    authority,
    password: md5(password).toUpperCase(),
    time: new Date()
  })
  user = yield user.save().catch(err => {
    utils.logger.error(err);
    this.throw(400,'创建用户失败')
  })
  user['password'] = null
  delete user['password']
  this.status = 200;
  this.body = {
    success:true,
    data: user
  }
}

function* updateUser(){
  const currUser = this.user
  let fields = {}, user
  if(this.request.body.password){
      if(this.request.body.password.length > 5){
        fields.password = md5(this.request.body.password).toUpperCase()
      }else{
        this.throw(400, '密码太短')
      }
  }
  if(this.request.body.name){
      fields.name = this.request.body.name.trim()
  }

  if(!fields.password && !fields.name){
      this.throw(400, '缺少字段')
  }
  if(currUser.authority === 1){
    user = yield User.update({_id: this.params.id},{$set:fields}).exec().catch(err => {
        utils.logger.error(err);
        this.throw(500,'内部错误')
    })
    this.status = 200;
    this.body = {
      success:true,
      data: user
    }
    return
  }else{
    user = yield User.findOne({_id: this.params.id}).exec().catch(err => {
        utils.logger.error(err);
        this.throw(500,'内部错误')
    })
    if(user.username === currUser.username){
      user = yield User.update({_id: this.params.id},{$set:fields}).exec().catch(err => {
          utils.logger.error(err);
          this.throw(500,'内部错误')
      })
      this.status = 200;
      this.body = {
        success:true,
        data: user
      }
      return
    }
  }
  this.throw(400, '没有权限')
}
