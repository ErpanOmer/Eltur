const AdminUser = require('./User/AdminUser.api')
const News = require('./News/News.api')
const Upload = require('./upload')
//    接口
module.exports = [
  AdminUser,
  News,
  Upload
]
