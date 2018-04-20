const express = require('express');
const Article = require('../../model/article.js');
const config = require('../../db.config.js')
const router = express.Router();
//  查询函数
const Query = require('../../common/query');
//  api
const api = '/application/Article'
const readingRankings = '/application/readingRankings'

//   新闻详细
router.param('id', function(req, res, next, id) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Article.findById({ _id: id }, function(err, article) {
      if (err) {
        return next(err);
      }
      if (!article) {
        res.json({success: false, code: 8888, message: '找不到此文章' });
        return next(new Error('failed to load article'));
      }
      if (article) {
        article.pageViews++
        article.save(err => {
          if (err) {
            console.log(err)
          }
        })
        req.article = article;
        next();
      }
    });
  } else {
    res.json({success: false, code: 8888, message: '参数无效' });
  }
});

//   获取某个新闻
router.get(`${api}/:id`, function(req, res){
  res.json({success: true, code: 520, message: '成功获取',data: req.article });
});

//  获取文章列表
router.get(api, (req, res) => {
  const { query, options } = Query(req.query)
  Article.paginate(query, options).then( results => {
    const data = {
      totalCount: results.total,
      pageSize: results.limit,
      currentPage: results.page,
      totalPage: results.pages,
      list: editPostList(results.docs)
    }
    res.json({success: true, code: 520, message: '获取成功!', data});
  });
});

router.get(readingRankings, (req, res) => {
  const { query, options } = Query(req.query)
  Article.paginate(query, options).then( results => {
    const data = {
      list: editPostList(results.docs)
    }
    res.json({success: true, code: 520, message: '获取成功!', data});
  });
})
//  文章列表过滤函数
function editPostList (list) {
  const article = []
  list.forEach(item => {
    const data = {
      title: item.title,
      cover: item.cover,
      id: item._id,
      pageViews: item.pageViews,
      fabulous: item.fabulous,
      commentNum: item.comments.length,
      createdTime: item.createdTime
    }
    article.push(data)
  })
  return article
}

module.exports = router
