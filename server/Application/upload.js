const express = require('express');
const router = express.Router();
const upload = require('../Public/upload');
const api = '/application/'

router.use(`${api}upload`, require('./Interceptor.js'))
router.get(`${api}upload`, function(req, res, next) {
  console.log(req.user)
  upload(req, res, next);
})
module.exports = router
