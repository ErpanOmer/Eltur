const express = require('express');
const router = express.Router();
const upload = require('../../common/upload');
const api = '/application/'

router.use(`${api}upload`, require('./interceptor.js'))
router.post(`${api}upload`, function(req, res, next) {
  upload(req, res, next);
})
module.exports = router
