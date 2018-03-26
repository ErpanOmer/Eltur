// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
const config = require('../../db.config.js')
/************** 定义模型Comment **************/
const Comment = new Schema({
  text: {
    type: String,
    required: true
  },
  author: {
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
/************** 定义模式News **************/
const News = new Schema({
  author: { type: String, default : '', require: true },
  title: { type : String, default : '', trim : true, require: true },   // 不可为空约束
  content: { type : String, default : '', trim : true, require: true },   // 不可为空约束
  contentShort: { type: String, default: '' },   //  摘要
  cover: { type: String, default : '' },
  status: { type: Number, default: 0 },  // 0 代表未审核， 1 代表已审核
  pageViews: { type: Number, default: 0 },   //  阅读数
  comments: { type: [Comment] },
  createdTime: { type : Number, default : 0 },
  stringTime: { type: String, default: '' }
});
News.plugin(mongoosePaginate);

/************** 定义模型静态方法 **************/
//   data参数  包含  author, text, cover, createdTime, 和 id
News.statics.postComment = function(data, callback) {
     const NewsModel = mongoose.model('News');
     const CommentModel = mongoose.model('Comment');
     const comment = new CommentModel();
     //   写入评论
     comment.text = data.text
     comment.author = data.author
     comment.cover = data.cover
     commet.createdTime = data.createdTime || ~~(new Date().getTime() / 1000)
     // 查询新闻
     NewsModel.findOne({ _id: data.newsID }, function(err, news) {
         if (err) {
             callback({
                 success: false,
                 code: 8888,
                 message: '找不到新闻文章'
             });
         } else {
             if (news) {
                 news.comments.push(comment);
                 news.save(function(err) {});
                 callback({ success: true, code: 520, message: '评论成功' });
             } else {
                 callback({ success: false, code: 8888, message: '评论失败'
                 });
             }
         }
     });
 }
/************** 定义模型Model **************/
mongoose.model('Comment', Comment);
module.exports = mongoose.model('News', News);
