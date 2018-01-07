const express = require('express');
const News = require('./News.db.js');
const config = require('../../db.config.js')
const passport = require('passport');
const router = express.Router();
require('../passport.js')(passport);
//  上传新闻
router.post('/elturAdmin/postNews', (req, res) => {
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
