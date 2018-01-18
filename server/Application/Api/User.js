const express = require('express');
const User = require('../Model/User.js');
const Sms = require('../../Public/SMS/Model.js');
const jwt = require('jsonwebtoken');
const config = require('../../db.config.js')
const passport = require('passport');
const router = express.Router();
require('../passport.js')(passport);
const api = '/application/'
// 注册账户
router.post(`${api}register`, (req, res) => {
  const body = req.body
  if (!body.mobile || !body.code || !body.password) {
    res.json({success: false, code: 8888, message: '参数错误'});
  } else {
    User.findOne({ mobile: body.mobile }, (err, mobile) => {
      if (err) {
        return console.log(err)
      } else if (mobile) {
        res.json({ success: false, code: 8888, message: '此手机号已经被注册'})
      } else if (!mobile) {
        Sms.findOne({ mobile: body.mobile }, (err, sms) => {
          if (err) {
            return console.log(err)
          } else if (sms) {
            if (sms.code === body.code) {
              const now = ~~(new Date().getTime() / 1000)
              const sendingTime = sms.sendingTime
              if ((sendingTime - now) > 60*10) {
                res.json({success: false, code: 8888, message: '验证码无效，可能过期'})
              } else {
                let user = new User({
                  mobile: body.mobile,
                  password: body.password,
                  createdTime: now,
                  updateTime: now
                });
                // 保存用户账号
                user.save((err) => {
                  if (err) {
                    return console.log(err)
                  }
                  res.json({success: true, code: 520, message: '注册成功'});
                })
              }
            } else {
              res.json({success: false, code: 8888, message: '验证码错误'})
            }
          } else if (!sms) {
            res.json({ success: false, code: 8888, message: '短信没有发送成功？'})
          }
        })
      }
    })
  }
});

router.post(`${api}login`, (req, res) => {
  const body = req.body
  if (!body.mobile || !body.status) {
    res.json({success: false, code: 8888, message: '参数错误' })
    return
  }
  User.findOne({ mobile: body.mobile }, (err, user) => {
    if (err) {
      return console.log(err)
    } else if (!user) {
      res.json({success: false, code: 8888, message: '登陆失败,用户不存在' });
    } else if(user) {
      //  短信登陆
      if (Number(body.status) === 1) {
        Sms.findOne({ mobile: body.mobile }, (err, sms) => {
          if (err) {
            return console.log(err)
          } else if (sms) {
            if (!body.code) {
              res.json({success: false, code: 8888, message: '验证码为空'})
              return
            }
            if (sms.code === body.code) {
              const now = ~~(new Date().getTime() / 1000)
              const sendingTime = sms.sendingTime
              if ((sendingTime - now) > 60*10) {
                res.json({success: false, code: 8888, message: '验证码无效，可能过期'})
              } else {
                let token = jwt.sign({mobile: user.mobile}, 'ILoveYou',{ expiresIn: 10080 });
                user.token = token;
                user.save(function(err){
                  if (err) {
                    return console.log(err)
                  }
                  res.json({ success: true, message: '登陆成功!', token: 'Bearer ' + token, code: 520 })
                })
              }
            } else {
              res.json({success: false, code: 8888, message: '验证码错误'})
            }
          } else if (!sms) {
            res.json({ success: false, code: 8888, message: '短信没有发送成功？'})
          }
        })
      } else if (Number(body.status) === 2) {   //  密码登陆
        if (!body.password) {
          res.json({success: false, code: 8888, message: '密码为空'})
          return
        }
        // 检查密码是否正确
        user.comparePassword(body.password, (err, isMatch) => {
          if (isMatch && !err) {
            let token = jwt.sign({mobile: user.mobile}, 'ILoveYou',{ expiresIn: 10080 })
            user.token = token;
            user.save(function(err){
              if (err) {
                return console.log(err)
              }
              res.json({ success: true, message: '登陆成功!', token: 'Bearer ' + token, code: 520 })
            })
          } else {
            res.json({success: false, code: 8888, message: '登陆失败,密码错误!'});
          }
        });
      }
    }
  });
});
// passport-http-bearer token 中间件验证
// 通过 header 发送 Authorization -> Bearer  + token
// 或者通过 ?access_token = token
router.get(`${api}getInfo`, function(req, res, next) {
  passport.authenticate('bearer', { session: false }, function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.json({success: false, code: 0, message: '请登录'});
    }
    if (user) {
      const data = { name: user.name, avatar: user.avatar, mobile: user.mobile }
      res.json({success: true, code: 520, message: '登陆成功', data });
    }
  })(req, res, next);
})
module.exports = router;