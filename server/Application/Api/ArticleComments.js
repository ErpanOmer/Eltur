const express = require('express');
const Article = require('../../Common/Model/Article.js');
const config = require('../../db.config.js')
const router = express.Router();
//  api
const api = '/application/Comments'
router.use(api, require('../Interceptor.js'))
router.post(api, (req, res) => {
  const body = req.body
  if (!body.id || !body.text) {
    res.json({ success: false, code: 8888, message: '没传参数' })
  }
  const data = {
    name: req.user.name,
    cover: req.user.avatar,
    text: body.text,
    id: body.id
  }
  Article.postComment(data, response => {
    res.json(response)
  })
})
module.exports = router
