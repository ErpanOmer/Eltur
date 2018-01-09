// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
const config = require('../../db.config.js')
/************** 定义模式loginSchema **************/
const News = new Schema({
  author: { type: String, default : '', require: true },
  title: { type : String, default : '', trim : true, require: true },   // 不可为空约束
  content: { type : String, default : '', trim : true, require: true },   // 不可为空约束
  contentShort: { type: String, default: '' },   //  摘要
  cover: { type: String, default : '' },
  createdTime  : { type : Number, default : 0 }
});
News.plugin(mongoosePaginate);
/************** 定义模型Model **************/
module.exports = mongoose.model('News', News);
