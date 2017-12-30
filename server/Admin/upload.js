const express = require('express');
const fs = require('fs');
const path= require("path");
const formidable = require('formidable');
const passport = require('passport');
const router = express.Router();
require('./passport.js')(passport);

router.post('/elturAdmin/upload', (req, res, next) => {
  passport.authenticate('bearer', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.json({success: false, code: 0, message: '请登录'});
    }
    if (user) {
      const form = new formidable.IncomingForm();
      //设置编辑
      form.encoding = 'utf-8';
      //设置文件存储路径
      form.uploadDir = '/var/Eltur/public/images/';
      //保留后缀
      form.keepExtensions = true;
      //设置单文件大小限制
      form.maxFieldsSize = 2 * 1024 * 1024;
      //form.maxFields = 1000;  设置所以文件的大小总和
      form.parse(req, function(err, fields, files) {
        console.log('文件路径:' + files.cover.path);
        console.log('文件名:'+files.cover.name);
        let time = (new Date()).getTime();
        //生成随机数
        let ran = parseInt(Math.random() * 8999 +10000);
        //拿到扩展名
        let extname = path.extname(files.cover.name);
        //path.normalize('./path//upload/data/../file/./123.jpg'); 规范格式文件名
        let oldpath = path.normalize(files.cover.path);
        //新的路径
        let newfilename = 'eltur_' + time + ran + extname;
        var newpath =  '/var/Eltur/public/images/' + newfilename;
        fs.rename(oldpath, newpath, err =>{
          if(err){
            res.json({ success: false, code: 8888, message: '上传失败' })
          }
          res.json({ success: true, code: 520, message: '上传成功', url: newpath })
        });
      });
    }
  })(req, res, next);
});
module.exports = router;
