const express = require('express');
const Swiper = require('../../model/swiper.js');
const config = require('../../db.config.js');
const router = express.Router();
//  api
const api = '/elturAdmin/swiper';
router.post(api, (req, res) => {
  const list = req.body.list
  if (!list) {
    res.json({success: false, code: 8888, message: '参数错误' });
    return false
  }
  const swiper = new Swiper({
    list,
    createdTime: ~~(new Date().getTime() / 1000)
  })
  swiper.save((err) => {
    if (err) {
      console.log(err)
      return false
    }
    res.json({success: true, code: 520, message: '设置成功'});
  });
})
module.exports = router
