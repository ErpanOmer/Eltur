// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
const dbURL = 'mongodb://121.42.177.248:7373/db'
// Using `mongoose.connect`...
var promise = mongoose.connect(dbURL, {
  useMongoClient: true,
  /* other options */
});
// Or `createConnection`
var promise = mongoose.createConnection(dbURL, {
  useMongoClient: true,
  /* other options */
});

promise.then(function(db) {
});
// Or, if you already have a connection
mongoose.connection.openUri(dbURL, {});

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));
