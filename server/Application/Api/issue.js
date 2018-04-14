const express = require('express');
const Issue = require('../Model/issue.js');
const config = require('../../db.config.js');
const router = express.Router();
//  api
const api = '/application/issue';
router.use(api, require('../Interceptor.js'))

//   新闻详细
router.param('id', function(req, res, next, id) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Issue.findById({ _id: id }, function(err, issue) {
      if (err) {
        return next(err);
      }
      if (!issue) {
        res.json({success: false, code: 8888, message: '找不到此文章' });
        return next(new Error('failed to load issue'));
      }
      if (issue) {
        issue.views++
        issue.save(err => {
          if (err) {
            console.log(err)
            return false
          } else {
            req.issue = issue;
            next();
          }
        })
      }
    });
  } else {
    res.json({success: false, code: 8888, message: '参数无效' });
  }
});

//   获取某个问题
router.get(`${api}/:id`, function(req, res){
  res.json({success: true, code: 520, message: '成功获取',data: req.issue });
});

//  发出问题
router.post(api, (req, res) => {
  const data = req.body.data
  if (!data.question || !data.type) {
    res.json({success: false, code: 8888, message: '没有传参数' })
    return false
  }
  Issue.saveIssue({ data, user: req.user }, response => {
    res.json(response)
  })
})

//  获取问题列表
router.get(api, (req, res) => {
  const { query, options } = Query(req.query)
  Issue.paginate(query, options).then( results => {
    const data = {
      totalCount: results.total,
      pageSize: results.limit,
      currentPage: results.page,
      totalPage: results.pages,
      list: results.docs
    }
    res.json({ success: true, code: 520, message: '获取成功!', data });
  });
});
//  导出
module.exports = router
