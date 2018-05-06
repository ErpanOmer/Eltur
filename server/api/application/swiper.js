const express = require('express');
const Swiper = require('../../model/swiper.js');
const config = require('../../db.config.js');
const router = express.Router();
//  api
const api = '/application/swiper';
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

router.get(`${api}/:id`, function(req, res){
  res.json({success: true, code: 520, message: '获取成功',data: req.swiper });
});

module.exports = router
