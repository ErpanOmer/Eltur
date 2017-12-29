const express = require('express');
const News = require('./News.db.js');
const config = require('../../db.config.js')
const passport = require('passport');
const router = express.Router();
require('../passport.js')(passport);
//  上传新闻
router.post('/elturAdmin/postNews', (req, res) => {
  const bodyParam = req.body
  if (!bodyParam.title || !bodyParam.body) {
    res.json({success: false, code: 8888, message: '必须要输入标题和内容'});
  } else {
    let news = new News({
      title: bodyParam.title,
      body: bodyParam.body,
      author: bodyParam.author,
      cover: bodyParam.cover
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
