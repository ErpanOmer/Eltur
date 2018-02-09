const express = require('express');
const router = express.Router();
const User = require('../Model/User.js')
const api = '/application/userInfo'
// passport-http-bearer token 中间件验证
// 通过 header 发送 Authorization -> Bearer  + token
// 或者通过 ?access_token = token
router.use(api, require('../Interceptor.js'))
router.get(api, function(req, res, next) {
  res.json({success: true, code: 520, message: '成功', data: req.user })
})
//  修改请求
router.put(api, (req, res, next) => {
  const body = req.body
  if (JSON.stringify(body) === '{}' || Object.keys(body).length === 0) {
    res.json({success: false, code: 8888, message: '没有找到请求参数'})
    return false
  }
  const isParams = !!(body.name ||
                      JSON.stringify(body.sex) ||
                      body.age ||
                      body.birthday ||
                      body.avatar);
  if (isParams) {
    User.update({ _id: req.user.id }, body, function(error){
      if (error) {
        return next(err);
      } else {
        res.json({success: true, code: 520, message: '修改成功'});
      }
    });
  } else {
    res.json({success: false, code: 8888, message: '无效的参数'})
    return false
  }
})
module.exports = router
