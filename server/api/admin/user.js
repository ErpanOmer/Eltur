const express = require('express');
const User = require('../../model/user.js');
const config = require('../../db.config.js');
const router = express.Router();
//  查询函数
const Query = require('../../common/query.js')
//  api
const api = '/elturAdmin/user';
//   获取新闻列表
router.get(api, (req, res) => {
  const { query, options } = Query(req.query)
  User.paginate(query, options).then( results => {
    const data = {
      totalCount: results.total,
      pageSize: results.limit,
      currentPage: results.page,
      totalPage: results.pages,
      list: usersData(results.docs)
    }
    res.json({success: true, code: 520, message: '获取成功!', data});
  });
});
//  数据过滤
function usersData(data) {
  const users = []
  data.forEach(item => {
    const user = {
      name: item.name,
      avatar: item.avatar,
      createdTime: item.createdTime,
      updateTime: item.updateTime,
      sex: item.sex,
      age: item.age,
      birthday: item.birthday,
      address: item.address,
      signature: item.signature,
      mobile: item.mobile
    }
    users.push(user)
  })
  return users
}
module.exports = router
