const express = require('express');
const router = express.Router();
const Sms = require('./Model')
const send = require('./Send')
// 发生短信验证
router.post('/eltur/sms', (req, res) => {
  // 修改为您要发送的手机号码，多个号码用逗号隔开
  const mobile = req.body.mobile;
  if (mobile == undefined || mobile.length < 11) {
    res.json({ success: false, code: 8888, message: '手机号位空'})
    return
  }
  if (mobile) {
    const ip = getClientIp(req)
    const code = range(0,6).map(x => {
      return Math.floor(Math.random()*10);
    }).join('');
    Sms.findOne({mobile}, (err, data) => {
      if (err) {
        console.log('数据库失败')
        console.log(err)
      }
      if (!data) {
        send(mobile, code, callback => {
          const response = JSON.parse(callback)
          if (response.code === 0) {
            const createdTime = ~~(new Date().getTime() / 1000)
            const sendingTime = createdTime
            const sms = new Sms({ mobile, ip, createdTime, sendingTime, code, sendCount: +1 })
            sms.save(err => {
              if (err) {code
                console.log('保存失败')
                console.log(err)
              } else {
                res.json({ success: true, code: 520, message: response.msg });
              }
            })
          } else {
            res.json({ success: false, code: 8888, message: response.msg });
          }
      })
    }
      if (data) {
        const now = ~~(new Date().getTime() / 1000);
        const diffSeconds = parseInt((now - data.sendingTime), 10);
        console.log(diffSeconds)
        if (diffSeconds < 1) {
            res.json({ success: false, code: 8888, message: `${90 - diffSeconds}s 后再试试`})
        } else if (data.sendCount >= 20) {
          const mode = parseInt((now - data.createdTime), 10);
          res.json({ success: false, code: 8888, message: `超过每小时发送次数, ${~~((60*60 - mode)/60)}分钟后再试试`});
        } else {
          send(mobile, code, callback => {
            const response = JSON.parse(callback)
            if (response.code === 0) {
              data.isUse = true;  //设置为已经使用过
              data.code = code;
              data.sendCount++;
              data.sendingTime = ~~(new Date().getTime() / 1000)
              data.save(err => {
                if (err) {
                  console.log('保存失败');
                  console.log(err);
                } else {
                  res.json({ success: true, code: 520, message: response.msg });
                }
              })
            } else {
              res.json({ success: false, code: 8888, message: response.msg });
            }
          });
        }
      }
    })
  }
});
//   生产随机码
function range(start, end) {
  var array=[];
  for(var i=start; i<end; ++i) {
    array.push(i);
  }
  return array;
};
//  获取客户端ip
var getClientIp = function(req) {
    var ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    if(ip.split(',').length>0){
        ip = ip.split(',')[0]
    }
    return ip;
};
// 导出
module.exports = router
