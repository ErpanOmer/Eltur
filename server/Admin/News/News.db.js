// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../../db.config.js')
/************** 定义模式loginSchema **************/
const News = new Schema({
  title: { type : String, default : '', trim : true, require: true },   // 不可为空约束
  body: { type : String, default : '', trim : true, require: true },   // 不可为空约束
  author: { type: String, default : '' },
  cover: { type: String, default : '' },
  createdAt  : { type : Date, default : Date.now }
});

/************** 定义模型Model **************/
module.exports = mongoose.model('News', News);
