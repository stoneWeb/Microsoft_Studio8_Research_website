"use strict"
const utils = require('../utils/index'),
      mw = require('../middlewares/index'),
      Keyword = require('../models/keyword'),
      Report = require('../models/report')

module.exports.init = router => {
  router.post('/reports', /*mw.verify_token,*/ create)
  router.get('/reports', reportList)
  router.patch('/reports/:id', /*mw.verify_token,*/ modify)
  router.delete('/reports/:id', /*mw.verify_token,*/ deleteReport)
}

function* create(){
  /*
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
  */
  var title = (this.request.body.title || "").trim(),
      goal  = (this.request.body.goal || "").trim(),
      methods = (this.request.body.methods || "").trim(),
      filelink = (this.request.body.filelink || "").trim(),
      researcher = (this.request.body.researcher || "").trim(),
      keywords = this.request.body.keywords || [],
      category = this.request.body.category,
      time = new Date();

  if(title === ""){
      this.throw(400, 'the title cannot be empty')
  }

  for(let w of keywords){
    Keyword.update({_id:w},{$inc:{count: 1}}).exec().catch(err => {
      utils.logger.error(err);
      //this.throw(500,'内部错误')
    });
  }

  const report = new Report({
    title, time, goal, methods, filelink, researcher, keywords, category
  })
  let result = yield report.save().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  })
  result = yield Report.findOne({_id: report._id})
    .populate('keywords')
    .exec().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
    })

  utils.print(result)
  this.status = 200
  this.body = {
    success: true,
    data: result
  }
}

function* reportList(next){
    const query = (this.query.query || "").trim()
    const category = this.query.category
    if("" !== query){
      utils.print(query)
      let _word = yield Keyword.findOne({
        name: query
      }).exec().catch(err => {})

      var q = {title: new RegExp(query)}
      if(_word != null){
        q = {
          "$or": [
            {title: new RegExp(query)},
            {keywords: {"$all": [_word._id]}}
          ]
        }
      }

      let _ref = yield Report.find(q)
      .populate('keywords')
      .sort({time: -1})
      .exec()
      .catch(err => {
        console.log(err);
        utils.logger.error(err);
        this.throw(500,'内部错误')
      })
      utils.print(_ref);
      this.body = {
        success:true,
        data: _ref
      }
    }else if(category*1 == category){
      let _ref = yield Report.find({category,})
        .populate('keywords')
        .sort({time: -1})
        .exec()
        .catch(err => {
          utils.logger.error(err);
          this.throw(500,'内部错误')
        })
        utils.print(_ref);
        this.body = {
          success:true,
          data: _ref
        }
    }else{
      let _ref
      if(!this.query.limit && !this.query.page){
        _ref = yield Report.find({})
          .populate('keywords')
          .sort({ time: -1})
          .exec().catch(err => {
            utils.logger.error(err);
            this.throw(500,'内部错误')
          })
      }else{
        const limit = ~~this.query.limit || 10,
              page = ~~this.query.page;
        let skip;
        if(page === 0){
            skip = 0
        }else{
            skip = limit * (page - 1)
        }
        _ref = yield Report.find({})
          .populate('keywords')
          .sort({ time: -1})
          .limit(limit).skip(skip).exec().catch(err => {
            utils.logger.error(err);
            this.throw(500,'内部错误')
          })
      }

      let total = yield Report.count().exec().catch(err => {
        utils.logger.error(err);
        this.throw(500,'内部错误')
      })

      this.status = 200
      const _refArr = []

      _ref.forEach((item, i) => {
          item = item.toObject()
          _refArr.push(item)
      })
      utils.print(_refArr);
      this.body = {
        success:true,
        data:{
          result: _refArr,
          total
        }
      }
    }
}

function* modify(next){
    const id = this.params.id
    const _ref = yield Report.findOne({_id: id}).exec().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
    })
    if (_ref != null) {
      const kws = this.request.body.keywords
      if(Array.isArray(kws)){
        // update keyword count
        const originKws = _ref.keywords
        for(let k of originKws){
          Keyword.update({_id:k},{$inc:{count: -1}}).exec().catch(err => {
            utils.logger.error(err);
          });
        }
        for(let k of kws){
          Keyword.update({_id:k},{$inc:{count: 1}}).exec().catch(err => {
            utils.logger.error(err);
          });
        }
      }
      delete this.request.body._id
      delete this.request.body.id
      let result = yield Report.findByIdAndUpdate(id, {$set: this.request.body},{new:true}).populate('keywords').exec().catch(err => {
        utils.logger.error(err);
        this.throw(500,'内部错误')
      })
      result = result.toObject();
      this.status = 200;
      utils.print(result);
      this.body = {
        success:true,
        data:result
      }
    }else{
      this.throw(400,'id不存在');
    }
}

function* deleteReport(){
  const id = this.params.id
  const _ref = yield Report.findOne({_id: id}).exec().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  })
  if(_ref != null){
    const kws = _ref.keywords
    for(let k of kws){
      yield Keyword.update({_id:k},{$inc:{count: -1}}).exec().catch(err => {
        utils.logger.error(err);
      });
    }
    yield Report.remove({_id:id}).exec().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
    })
    this.status = 200;
    this.body = {
      success:true
    }
  }else{
    this.throw(400,'id不存在');
  }
}
