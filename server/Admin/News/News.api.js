const express = require('express');
const News = require('./News.db.js');
const config = require('../../db.config.js')
const router = express.Router();
//  api
const api = '/elturAdmin/News'
router.use(api, require('../Interceptor.js'))

//   新闻详细
router.param('id', function(req, res, next, id) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    News.findById({ _id: id }, function(err, news) {
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

//   获取新闻列表
router.get(api, (req, res) => {
  //  参数
  const query = req.query;
  const page = query.page || 1;
  const pageSize = query.pageSize || 10;
  const sort = query.sort || 'desc';
  const where = query.where ? query.where : '';
  News.find({}).exec((err, results) => {
    if (err) {
      return res.json({success: false, code: 8888, message: err });
    } else {
      const totalPage = Math.ceil(results.length / pageSize);
      res.json({success: true, code: 520, message: '获取成功!', data: totalPage});
    }
  })
});
//  上传新闻
router.post(api, (req, res) => {
  const bodyParam = req.body
  if (!bodyParam.title || !bodyParam.content) {
    res.json({success: false, code: 8888, message: '必须要输入标题和内容'});
  } else {
    let news = new News({
      author: bodyParam.author,
      title: bodyParam.title,
      content: bodyParam.content,
      contentShort: bodyParam.contentShort || '',
      cover: bodyParam.cover,
      createdTime: bodyParam.createdTime || parseInt(new Date().getTime() / 1000)
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
