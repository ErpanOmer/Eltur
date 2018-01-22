const express = require('express');
const router = express.Router();
const api = '/application/'
// passport-http-bearer token 中间件验证
// 通过 header 发送 Authorization -> Bearer  + token
// 或者通过 ?access_token = token
router.use(`${api}getInfo`, require('../Interceptor.js'))
router.get(`${api}getInfo`, function(req, res, next) {
  // passport.authenticate('bearer', { session: false }, function(err, user, info) {
  //   if (err) {
  //     return next(err);
  //   }
  //   if (!user) {
  //     res.json({success: false, code: 0, message: '请登录'});
  //   }
  //   if (user) {
  //     const data = { name: user.name, avatar: user.avatar, mobile: user.mobile }
  //     res.json({success: true, code: 520, message: '登陆成功', data });
  //   }
  // })(req, res, next);
})

module.exports = router
