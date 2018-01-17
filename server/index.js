//***************************************************//
//********************  框架和依赖插件  ******************//
//***************************************************//
// 引入Express
const express = require('express');
const app = express();
//   配合前端 history 模式
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
// 引入文件模块
const fs = require('fs');
// 引入处理路径的模块
const path = require('path');
// 引入处理post数据的模块
const bodyParser = require('body-parser')
//   日志插件
const session = require('express-session')
const flash = require('connect-flash')
const MongoStore = require('connect-mongo')(session)
var mongoose = require('mongoose')
const config = require('./db.config.js')
const morgan = require('morgan')
const passport = require('passport');// 用户认证模块passport
const Strategy = require('passport-http-bearer').Strategy;// token验证模块
// 自定义token
morgan.token('from', function(req, res){
    return req.query.from || '-';
});
// 自定义format，其中包含自定义的token
morgan.format('Phantom', '[Phantom] :method :url :status :from');
// 使用自定义的format
app.use(morgan('Phantom'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store:new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    cookie:{maxAge:180 * 60 * 1000} //store保存时间
}));
app.use(flash());
app.use(passport.initialize());// 初始化passport模块
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//***************************************************//
//********************  结束  ******************//
//***************************************************//
//
//
//
//
//
//****************************************************//
//********************    请求api   ******************//
//***************************************************//
// 引入编写好的api
const ADMIN_API = require('./Admin')
const PUBLIC = require('./Public')
const APPLICATION_API = require('./Application')
app.use(...APPLICATION_API)
app.use(...ADMIN_API)
app.use(...PUBLIC)
//***************************************************//
//********************  结束  ******************//
//***************************************************//
//
//
//
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
// 因为是单页应用 所有请求都走/dist/index.html
// 服务器 图片文件
app.use(express.static(path.resolve(__dirname, '../public/')))
//  服务器静态资源
app.get(/index/, function(req, res) {
  //   eltur  前端模板
  app.use(express.static(path.resolve(__dirname, '../dist/front')))
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/front/index.html'), 'utf-8')
  res.send(html)
})
app.get(/admin/, function(req, res) {
  //   eltur  后台模板
  app.use(express.static(path.resolve(__dirname, '../dist/admin')))
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/admin/index.html'), 'utf-8')
  res.send(html)
})
// 监听7373端口
app.listen(80);
console.log('Eltur project is success!');
