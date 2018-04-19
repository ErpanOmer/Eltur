const express = require('express');
const Issue = require('../../model/issue.js');
const config = require('../../db.config.js');
const router = express.Router();
//  查询函数
const Query = require('../../common/query.js')
//  api
const api = '/elturAdmin/issue';
// router.use(api, require('./interceptor.js'))

//   新闻详细
router.param('id', function(req, res, next, id) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Issue.findById({ _id: id }, function(err, issue) {
      if (err) {
        return next(err);
      }
      if (!issue) {
        res.json({success: false, code: 8888, message: '找不到此咨询信息' });
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

router.post('/elturAdmin/replyIssue', (req, res) => {
  const data = req.body
  if (!data.id || !data.answerText) {
    res.json({success: false, code: 8888, message: '没有传参数' })
    return false
  }
  Issue.replyIssue(data, response => {
    res.json(response)
  })
})
//  导出
module.exports = router
