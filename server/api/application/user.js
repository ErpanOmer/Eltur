const express = require('express');
const User = require('../../model/user.js');
const Sms = require('../../model/sms.js');
const jwt = require('jsonwebtoken');
const config = require('../../db.config.js')
const router = express.Router();
const api = '/application/'
// 注册账户
router.post(`${api}a`, (req, res) => {
  const body = req.body
  if (!body.mobile || !body.code || !body.password) {
    res.json({success: false, code: 8888, message: '参数错误'});
  } else {
    User.findOne({ mobile: body.mobile }, (err, mobile) => {
      if (err) {
        return console.log(err)
      } else if (mobile) {
        res.json({ success: false, code: 8888, message: '此手机号已经被注册o'})
      } else if (!mobile) {
        Sms.findOne({ mobile: body.mobile }, (err, sms) => {
          if (err) {
            return console.log(err)
          } else if (sms) {
            console.log(sms.code)
            if (sms.code === body.code) {
              const now = ~~(new Date().getTime() / 1000)
              const sendingTime = sms.sendingTime
              console.log(sendingTime - now);
              if ((now - sendingTime) > 60*10) {
                res.json({success: false, code: 8888, message: '验证码无效，可能过期'})
              } else {
                console.log(typeof now)
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
                  sms.code = '';
                  sms.save(err => {})
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
              if ((now - sendingTime) > 60*10) {
                res.json({success: false, code: 8888, message: '验证码无效，可能过期'})
              } else {
                let token = jwt.sign({mobile: user.mobile}, 'YouLoveMe',{ expiresIn: 10080 });
                user.token = token;
                user.updateTime = now;
                user.save(function(err){
                  if (err) {
                    return console.log(err)
                  }
                  sms.code = '';
                  sms.save(err => {})
                  const data = {
                    token
                  }
                  res.json({ success: true, message: '登陆成功!', data, code: 520 })
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
            let token = jwt.sign({mobile: user.mobile}, 'YouLoveMe',{ expiresIn: 10080 })
            user.token = token;
            user.updateTime = ~~(new Date().getTime() / 1000);
            user.save(function(err){
              if (err) {
                return console.log(err)
              }
              const data = {
                token
              }
              res.json({ success: true, message: '登陆成功!', data, code: 520 })
            })
          } else {
            res.json({success: false, code: 8888, message: '登陆失败,密码错误!'});
          }
        });
      }
    }
  });
});
module.exports = router;
