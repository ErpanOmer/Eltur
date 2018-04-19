const express = require('express');
const Article = require('../../model/article.js');
const config = require('../../db.config.js')
const router = express.Router();
//  api
const api = '/application/Fabulous'
router.post(api, (req, res) => {
  const body = req.body
  if (!body.id || !body.addNum) {
    res.json({success: false, code: 8888, message: '没有传参数' })
    return false
  }
  Article.findById({ _id: body.id }, (err, article) => {
    if (err) {
      return next(err);
    }
    if (!article) {
      res.json({success: false, code: 8888, message: '找不到此文章' });
      return next(new Error('failed to load article'));
    }
    if (article) {
      if (Number(body.addNum) === 1) {
        article.fabulous++
      } else {
        article.fabulous--
      }
      article.save(err => {
        if (err) {
          console.log(err)
        }
        res.json({ success: true, code: 520, message: '操作成功' });
      })
    }
  });
})
module.exports = router
