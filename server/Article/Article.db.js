// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
const config = require('../db.config.js')
/************** 定义模式loginSchema **************/
const Article = mongoose.Schema({
    title : String,
    date : Date,
    author: String,
    detaild: String
});

/************** 定义模型Model **************/
const Models = {
    Article : mongoose.model('Article',Article)
}
module.exports = Models;
