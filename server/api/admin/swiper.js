const express = require('express');
const Swiper = require('../../model/swiper.js');
const config = require('../../db.config.js');
const router = express.Router();
//  api
const api = '/elturAdmin/swiper';
router.param('id', function(req, res, next, id) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Swiper.findById({ _id: id }, function(err, swiper) {
      if (err) {
        return next(err);
      }
      if (!swiper) {
        res.json({success: false, code: 8888, message: '找不到此轮播图列表' });
        return next(new Error('failed to load swiper'));
      }
      if (swiper) {
        req.swiper = swiper;
        next();
      }
    });
  } else {
    res.json({success: false, code: 8888, message: '参数无效' });
  }
});
//  获取
//   获取某个新闻
router.get(`${api}/:id`, function(req, res){
  res.json({success: true, code: 520, message: '获取成功',data: req.swiper });
});
//  修改
router.put(`${api}/:id`, (req, res) => {
  const list = req.body.list
  if (!list) {
    res.json({success: false, code: 8888, message: '参数错误' });
    return false
  }
  console.log(req.swiper)
  Swiper.update({ _id: req.swiper.id }, { list }, function(error){
    if (error) {
      return next(err);
    } else {
      res.json({success: true, code: 520, message: '操作成功'});
    }
  });
})
module.exports = router
