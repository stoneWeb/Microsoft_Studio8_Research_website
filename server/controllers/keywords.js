"use strict"
const utils = require('../utils/index'),
      mw = require('../middlewares/index'),
      Keyword = require('../models/keyword'),
      Report = require('../models/report')

module.exports.init = router => {
  router.post('/keywords', /*mw.verify_token,*/ create)
  router.get('/keywords', keywordList)
  router.patch('/keywords/:id', /*mw.verify_token,*/ modify)
  router.delete('/keywords/:id', /*mw.verify_token,*/ deleteKeyword)
}

function* keywordList(next){
  const keywords = yield Keyword.find({}).exec().catch(err => {
    utils.logger.error(err)
    this.throw(500,'内部错误')
  })
  this.status = 200
  this.body = {
    success: true,
    data: keywords
  }
}

function* create(next){
  const name = this.request.body.name
  if('undefined' === typeof name || 0 === name.length){
    this.throw(400, 'lack keyword')
  }
  const word = yield Keyword.findOne({name:name}).exec().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  });
  utils.print(word);
  if(word !== null){
    this.status = 200;
    //标签已存在
    this.body = {
      success: false,
      data:{
        id: word.id
      }
    }
    return;
  }
  const newWord = new Keyword({
    name,
  })
  const result = yield newWord.save().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  })
  utils.print(result);
  this.status = 200;
  this.body = {
    success:true,
    data: result
  }
}

function* modify(){
  const name = this.request.body.name;
  const id = this.params.id;
  const keyword = yield Keyword.findOne({name,}).exec().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  });
  utils.print(keyword);
  if(keyword !== null){
    this.status = 200;
    this.body = {
      success:false,
      data:{
        id:keyword.id
      }
    }
  }else{
    yield Keyword.update({_id:id},{$set:{name,}}).exec().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
    });
    this.status = 200;
    this.body = {
      success:true
    }
  }
}

function* deleteKeyword(){
  const id = this.params.id;
  yield [Report.update({},{$pull:{keywords:id}}).exec().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  }),Keyword.remove({_id:id}).exec().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  })];
  this.status = 200;
  this.body = {
    success:true
  }
}
