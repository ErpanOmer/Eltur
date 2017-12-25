// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../../db.config.js')
/************** 定义模式loginSchema **************/
const Article = new Schema({
  title: { type : String, default : '', trim : true, require: true // 不可为空约束 },
  body: { type : String, default : '', trim : true, require: true // 不可为空约束 },
  user: { type : Schema.ObjectId, ref : 'User' },
  comments: [{
    body: { type : String, default : '' },
    user: { type : Schema.ObjectId, ref : 'User' },
    createdAt: { type : Date, default : Date.now }
  }],
  image: String,
  createdAt  : { type : Date, default : Date.now }
});

/************** 定义模型Model **************/
const Models = {
    Article : mongoose.model('Article',Article)
}
module.exports = Models;
