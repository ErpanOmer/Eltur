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
  }
});
/************** 定义模式Article **************/
const Article = new Schema({
  author: { type: String, default : '', require: true },   //  作者
  source: { type: String, default: '' },   //  来源
  title: { type : String, default : '', trim : true, require: true },   // 不可为空约束
  content: { type : String, default : '', trim : true, require: true },   // 不可为空约束
  contentShort: { type: String, default: '' },   //  摘要
  cover: { type: String, default : '' },
  status: { type: Number, default: 0 },  // 0 代表未审核， 1 代表已审核
  pageViews: { type: Number, default: 0 },   //  阅读数
  fabulous: { type: Number, default: 0 },  //  点赞数
  category: { type: Number, default: 0 },  //  文章类型
  comments: { type: [Comment] },
  createdTime: { type : Number, default : 0 },
  updatedTime: { type: Number, default: 0},
  stringTime: { type: String, default: '' }
});
Article.plugin(mongoosePaginate);

/************** 定义模型静态方法 **************/
//   data参数  包含  name, text, cover, createdTime, 和 id
Article.statics.postComment = function(data, callback) {
     const Article = mongoose.model('Article');
     const CommentModel = mongoose.model('Comment');
     const comment = new CommentModel();
     //   写入评论
     comment.articleId = data.id
     comment.text = data.text
     comment.name = data.name
     comment.cover = data.cover
     comment.createdTime = ~~(new Date().getTime() / 1000)
     // 查询新闻
     Article.findById({ _id: data.id }, function(err, news) {
         if (err) {
             callback({
                 success: false,
                 code: 8888,
                 message: '找不到新闻文章'
             });
         } else {
             if (news) {
                 news.comments.unshift(comment);
                 //  保存
                 news.save()
                 comment.save()
                 callback({ success: true, code: 520, message: '评论成功' });
             } else {
                 callback({ success: false, code: 8888, message: '评论失败'})
             }
         }
     });
 }
/************** 定义模型Model **************/
mongoose.model('Comment', Comment);
module.exports = mongoose.model('Article', Article);
