const express = require('express');
const Article = require('../../model/article.js');
const config = require('../../db.config.js')
const router = express.Router();
//  查询函数
const Query = require('../../common/query.js')
//  api
const api = '/elturAdmin/Article'
// router.use(api, require('../Interceptor.js'))

//   新闻详细
router.param('id', function(req, res, next, id) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Article.findById({ _id: id }, function(err, news) {
      if (err) {
        return next(err);
      }
      if (!news) {
        res.json({success: false, code: 8888, message: '找不到此新闻' });
        return next(new Error('failed to load news'));
      }
      if (news) {
        req.news = news;
        next();
      }
    });
  } else {
    res.json({success: false, code: 8888, message: '参数无效' });
  }
});
//   获取某个新闻
router.get(`${api}/:id`, function(req, res){
  res.json({success: true, code: 520, message: '成功获取',data: req.news });
});

//   删除新闻
router.delete(`${api}/:id`, function(req, res){
  Article.remove({ _id: req.news.id }, function(err, news) {
    if (err) {
      return next(err);
    } else {
      res.json({success: true, code: 520, message: '删除成功'});
    }
  });
});

// 更新新闻
router.put(`${api}/:id`, (req, res) => {
  const data = req.body
  if(JSON.stringify(data) === '{}') {
    res.json({success: false, code: 8888, message: '无效的数据'});
    return false
  }
  Article.update({ _id: req.news.id }, data, function(error){
    if (error) {
      return next(err);
    } else {
      res.json({success: true, code: 520, message: '修改成功'});
    }
  });
})

//   获取新闻列表
router.get(api, (req, res) => {
  const { query, options } = Query(req.query)
  Article.paginate(query, options).then( results => {
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
//  上传新闻
router.post(api, (req, res) => {
  const bodyParam = req.body
  if (!bodyParam.title || !bodyParam.content) {
    res.json({success: false, code: 8888, message: '必须要输入标题和内容'});
  } else {
    console.log(bodyParam.source)
    let news = new Article({
      author: bodyParam.author || '',
      source: bodyParam.source || '',
      title: bodyParam.title,
      content: bodyParam.content,
      contentShort: bodyParam.contentShort || '',
      cover: bodyParam.cover,
      category: bodyParam.category,
      createdTime: bodyParam.createdTime ?  ~~(bodyParam.createdTime / 1000) : ~~(new Date().getTime() / 1000),
    });
    // 保存用户账号
    news.save((err) => {
      if (err) {
        return res.json({success: false, code: 8888, message: '发布失败'});
      }
      res.json({success: true, code: 520, message: '发布成功!'});
    });
  }
});
module.exports = router;
