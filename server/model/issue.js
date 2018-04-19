const mongoose = require('mongoose');
const config = require('../db.config.js')
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const Issue = new Schema({
  question: {
    type: String,
    default: ''
  },
  cover: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  category: {
    type: Number,
    default: ''
  },
  views: {
    type: Number,
    default: 0
  },
  alreadyAnswered: {
    type: Boolean,
    default: false
  },
  answerText: {
    type: String,
    default: ''
  },
  fabulous:{
    type: Number,
    default: 0
  },
  createdTime: {
    type: Number,
    default: 0
  },
  updateTime: {
    type: Number,
    default: 0
  }
})
//  分页插件
Issue.plugin(mongoosePaginate);
//  静态函数
Issue.statics.saveIssue = function(data, callback) {
  const Issue = mongoose.model('Issue');
  const issue = new Issue();
  //  咨询问题
  issue.createdTime = ~~(new Date().getTime() / 1000);
  issue.question = data.data.question;
  issue.category = data.data.type;
  issue.cover = data.user.avatar;
  issue.name = data.user.name;
  issue.save(err => {
    if (err) {
      callback({
          success: false,
          code: 8888,
          message: '数据库错误'
      });
    } else {
      callback({
          success: true,
          code: 520,
          message: '操作成功'
      });
    }
  })
}
//  回复咨询问题
Issue.statics.replyIssue = function(data, callback) {
  const Issue = mongoose.model('Issue');
  Issue.findById({ _id: data.id }, function(err, issue) {
    if (err) {
      return next(err);
    }
    if (!issue) {
      callback({success: false, code: 8888, message: '找不到此文章' });
      return next(new Error('failed to load issue'));
    }
    if (issue) {
      issue.answerText = data.answerText
      issue.alreadyAnswered = true
      issue.updateTime = ~~(new Date().getTime() / 1000);
      issue.save(err => {
        if (err) {
          console.log(err)
          return false
        } else {
          callback({
            success: true,
            code: 520,
            message: '回复成功'
          });
        }
      })
    }
  })
}

module.exports = mongoose.model('Issue', Issue);
