const express = require('express');
const AdminUser = require('../Model/AdminUser.js');
const jwt = require('jsonwebtoken');
const config = require('../../db.config.js')
const passport = require('passport');
const router = express.Router();
require('../passport.js')(passport);
// 注册账户
router.post('/elturAdmin/signup', (req, res) => {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, message: '请输入您的账号密码'});
  } else {
    var newUser = new AdminUser({
      name: req.body.name,
      password: req.body.password
    });
    // 保存用户账号
    newUser.save((err) => {
      if (err) {
        return res.json({success: false, code: 8888, message: '注册失败'});
      }
      res.json({success: true, code: 520, message: '成功创建新用户!'});
    });
  }
});

// 检查用户名与密码并生成一个accesstoken如果验证通过
router.post('/elturAdmin/Login', (req, res) => {
  AdminUser.findOne({
    name: req.body.name
  }, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.json({success: false, code: 8888, message: '登陆失败,用户不存在' });
    } else if(user) {
      // 检查密码是否正确
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          var token = jwt.sign({name: user.name}, 'ILoveYou',{
            expiresIn: 10080
          });
          user.token = token;
          user.save(function(err){
            if (err) {
              res.send(err);
            }
          });
          res.json({
            success: true,
            message: '登陆成功!',
            token: 'Bearer ' + token,
            code: 520,
          });
        } else {
          res.json({success: false, code: 8888, message: '登陆失败,密码错误!'});
        }
      });
    }
  });
});
// passport-http-bearer token 中间件验证
// 通过 header 发送 Authorization -> Bearer  + token
// 或者通过 ?access_token = token
router.get('/elturAdmin/Info', function(req, res, next) {
  passport.authenticate('bearer', { session: false }, function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.json({success: false, code: 0, message: '请登录'});
    }
    if (user) {
      const data = { name: user.name, avatar: user.avatar }
      res.json({success: true, code: 520, message: '成功', data });
    }
  })(req, res, next);
});

router.get('/elturAdmin/Logout', (req, res ,next) => {
  passport.authenticate('bearer', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.json({success: false, code: 0, message: '请登录'});
    }
    if (user) {
      AdminUser.findOne({
          token: user.token
      }, (err, self) => {
          if (err) {
              res.json({success: false, code: 8888, message: '退出失败'});
              return next(err);
          }
          if (!self) {
             res.json({success: false, code: 8888, message: '退出失败'});
          }
          if (self) {
            self.token = '';
            self.save(err => {
              if (err) {
                res.send(err);
              }
              res.json({success: true, code: 520, message: '退出成功'});
          })
        }
      });

    }
  })(req, res, next);
})
module.exports = router;
