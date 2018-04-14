const USER = require('./Api/User.js')
const USER_INFO = require('./Api/UserInfo.js')
const UPLOAD = require('./upload')
const ARTICLE = require('./Api/Article.js')
const ArticleFabulous = require('./Api/ArticleFabulous.js')
const ArticleComments = require('./Api/ArticleComments.js')
const issue = require('./Api/issue.js')
module.exports = [
  USER,
  USER_INFO,
  UPLOAD,
  ARTICLE,
  ArticleFabulous,
  ArticleComments,
  issue
]
