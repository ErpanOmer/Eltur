const express = require('express');
const router = express.Router();
const api = '/application/'
// passport-http-bearer token 中间件验证
// 通过 header 发送 Authorization -> Bearer  + token
// 或者通过 ?access_token = token
router.use(`${api}getInfo`, require('../Interceptor.js'))
router.get(`${api}getInfo`, function(req, res, next) {
  const data = { name: req.user.name, avatar: req.user.avatar }
  res.json({success: true, code: 520, message: '成功', data })
})
module.exports = router
