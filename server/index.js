//***************************************************//
//********************  框架和依赖插件  ******************//
//***************************************************//
// 引入Express
const express = require('express');
const app = express();
//   配合前端 history 模式
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Length, Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie, HTTP_TOKEN, Authorization, token');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//***************************************************//
//********************  结束  ******************//
//***************************************************//
//
//
//
//****************************************************//
//********************    请求api   ******************//
//***************************************************//
// 引入编写好的api
const APPLICATION_API = require('./api/application')
const ADMIN_API = require('./api/admin')
app.use(...APPLICATION_API)
app.use(...ADMIN_API)
// 监听7373端口
app.listen(8080);
console.log('Eltur project is success!');
