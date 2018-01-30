const express = require('express');
const fs = require('fs');
const path= require("path");
const formidable = require('formidable');
const passport = require('passport');
const router = express.Router();
const upload = require('../../Public/upload');
require('./passport.js')(passport);

router.post('/elturAdmin/upload', (req, res, next) => {
  passport.authenticate('bearer', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.json({success: false, code: 0, message: '请登录'});
    }
    if (user) {
      upload(req, res, next);
    }
  })(req, res, next);
});
module.exports = router;
