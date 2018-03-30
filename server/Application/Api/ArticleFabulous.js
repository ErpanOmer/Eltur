const express = require('express');
const Article = require('../../Common/Model/Article.js');
const config = require('../../db.config.js')
const router = express.Router();
//  api
const api = '/application/Fabulous'
router.post(api, (req, res) => {
  res.json({ success: true, code: 520, message: '成功获取' });
})
module.exports = router
