const fs = require('fs');
const path= require("path");
const formidable = require('formidable');

module.exports = function (req, res, next) {
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
      let time = (new Date()).getTime();
      //生成随机数
      let ran = parseInt(Math.random() * 8999 +10000);
      //拿到扩展名
      let extname = path.extname(files.file.name);
      //path.normalize('./path//upload/data/../file/./123.jpg'); 规范格式文件名
      let oldpath = path.normalize(files.file.path);
      //新的路径
      let newfilename = 'eltur_' + time + ran + extname;
      var newpath =  '/var/Eltur/public/images/' + newfilename;
      fs.rename(oldpath, newpath, err =>{
        if(err){
          res.json({ success: false, code: 8888, message: '上传失败' })
        }
        res.json({ success: true, code: 520, message: '上传成功', url: 'http://www.eltur.cn/images/' + newfilename })
      });
    })
}
