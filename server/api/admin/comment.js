const express = require('express');
const Comment = require('../../model/comment.js');
const Article = require('../../model/article.js');
const config = require('../../db.config.js');
const router = express.Router();
//  查询函数
const Query = require('../../common/query.js')
//  api
const api = '/elturAdmin/comment';
//   评论详细
router.param('id', function(req, res, next, id) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Comment.findById({ _id: id }, function(err, comment) {
      if (err) {
        return next(err);
      }
      if (!comment) {
        res.json({success: false, code: 8888, message: '找不到此评论' });
        return next(new Error('failed to load comment'));
      }
      if (comment) {
        req.comment = comment;
        next();
      }
    });
  } else {
    res.json({success: false, code: 8888, message: '参数无效' });
  }
});

//   获取某个评论
router.get(`${api}/:id`, function(req, res){
  res.json({success: true, code: 520, message: '成功获取',data: req.comment });
});

//   删除新闻
router.delete(api, function(req, res){
  Article.findById({ _id: req.query.articleId }, (err, article) => {
    if (err) {
      return next(err);
    }
    if (!article) {
      Comment.remove({ _id: req.query.commentId }, function(err, comment) {
        if (err) {
          return next(err);
        } else {
          res.json({success: true, code: 520, message: '删除成功'});
        }
      });
    }
    if (article) {
      const comments = article.comments
      const index = comments.findIndex(item => {
        return String(item._id) === req.query.commentId
      })
      comments.splice(index, 1);
      article.save(err => {
        if (err) {
          console.log(err)
          return next(err);
        } else {
          Comment.remove({ _id: req.query.commentId }, function(err, comment) {
            if (err) {
              return next(err);
            } else {
              res.json({success: true, code: 520, message: '删除成功'});
            }
          });
        }
      });
    }
  })
});

//   获取新闻列表
router.get(api, (req, res) => {
  const { query, options } = Query(req.query)
  Comment.paginate(query, options).then( results => {
    const data = {
      totalCount: results.total,
      pageSize: results.limit,
      currentPage: results.page,
      totalPage: results.pages,
      list: results.docs
    }
    res.json({success: true, code: 520, message: '获取成功!', data});
  });
});
//  导出
module.exports = router
