const https = require('https');
const qs = require('querystring');
const apikey = 'eefec9a18bc10f19e1369e7a4cc18200';
const send_sms_uri = '/v2/sms/single_send.json';
// 智能匹配模板发送https地址
const sms_host = 'sms.yunpian.com';
//  导出通用  发送短信函数
module.exports = function (mobile, text, callback){
  const post_data = {
  'apikey': apikey,
  'mobile':mobile,
  'text':text,
  };//这是需要提交的数据
  const content = qs.stringify(post_data);
  post(send_sms_uri, content, sms_host, cb => {
    callback(cb)
  });
}
//   api
function post(uri, content, host, callback){
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
        res.on('data', function (data) {
            callback(data)
        });
    });
    //console.log(content);
    req.write(content);
    req.end();
}
