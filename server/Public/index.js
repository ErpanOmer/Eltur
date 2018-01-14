const express = require('express');
const https = require('https');
const qs = require('querystring');
const router = express.Router();
const Sms = require('./Sms')

const apikey = 'eefec9a18bc10f19e1369e7a4cc18200';
const send_sms_uri = '/v2/sms/single_send.json';
// 智能匹配模板发送https地址
const sms_host = 'sms.yunpian.com';
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
        //  如果不存在次手机号执行
        const createdTime = ~~(new Date().getTime() / 1000)
        const sendingTime = createdTime
        const sms = new Sms({ mobile, ip, createdTime, sendingTime, code, sendCount: +1 })
        sms.save(err => {
          if (err) {
            console.log('保存失败')
            console.log(err)
          } else {
            res.json({ success: true, code: 520, message: '发送成功'})
          }
        })
      }
      if (data) {
        const now = ~~(new Date().getTime() / 1000);
        const diffSeconds = parseInt((now - data.sendingTime), 10);
        console.log(diffSeconds)
        if (diffSeconds < 90) {
            res.json({ success: false, code: 8888, message: `${90 - diffSeconds}s 后再试试`})
        } else if (data.sendCount >= 5) {
          const mode = parseInt((now - data.createdTime), 10);
          res.json({ success: false, code: 8888, message: `超过每小时发送次数, ${~~((60*60 - mode)/60)}分钟后再试试`});
        } else {
          data.isUse = true;  //设置为已经使用过
          data.code = code;
          data.sendCount++;
          data.sendingTime = ~~(new Date().getTime() / 1000)
          data.save(err => {
            if (err) {
              console.log('保存失败');
              console.log(err);
            } else {
              res.json({ success: true, code: 520, message: '发送成功'});
              const text = '【云片网】您的验证码是' + code;
              send_sms(send_sms_uri,apikey, mobile, text);
            }
          })
        }
        }
    })
  }
});

//  发生函数
function send_sms(uri,apikey,mobile,text){
    var post_data = {
    'apikey': apikey,
    'mobile':mobile,
    'text':text,
    };//这是需要提交的数据
    var content = qs.stringify(post_data);
    post(uri,content,sms_host);
}

function post(uri,content,host){
    var options = {
        hostname: host,
        port: 443,
        path: uri,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    var req = https.request(options, function (res) {
        // console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });
    //console.log(content);
    req.write(content);

    req.end();
}
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
