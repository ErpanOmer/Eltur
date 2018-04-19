const express = require('express');
const passport = require('passport');
const router = express.Router();
require('./passport.js')(passport);
//   拦截器
router.use((req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.json({success: false, code: 0, message: '请登录'});
    }
    if (user){
      req.user = {
        name: user.name,
        sex: user.sex,
        age: user.age,
        birthday: user.birthday,
        mobile: user.mobile,
        avatar: user.avatar,
        address: user.address,
        signature: user.signature,
        createdTime: user.createdTime,
        updateTime: user.updateTime,
        id: user._id
      }
      next();
    }
  })(req, res, next);
});

module.exports = router
