// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
const config = require('../db.config.js')
/************** 定义模型Comment **************/
const Comment = new Schema({
  articleId: {
    type: String,
    default: ''
  },
  articleTitle: {
    type: String,
    default: '',
  },
  articlecategory: {
    type: Number,
    default: 0
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    default: ''
  },
  createdTime: {
    type: Number,
    default: 0
  },
});
Comment.plugin(mongoosePaginate);

/************** 定义模型Model **************/
module.exports = mongoose.model('Comment', Comment);
exports.Comment = Comment
