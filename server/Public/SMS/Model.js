const mongoose = require('mongoose');
const config = require('../../db.config.js')
const Schema = mongoose.Schema;
const ttl = require('mongoose-ttl');
const Sms = new Schema({
  mobile: {
    type: String,
    require: true // 不可为空约束
  },
  code: {
    type: String,
    require: true,
    default: ''
  },
  createdTime: {
    type: Number,
    default: 0
  },
  sendingTime: {
    type: Number,
    default: 0
  },
  ipAddress: {
    type: String,
    default: '0.0.0.0'
  },
  isUse: {
    type: Boolean,
    default: false
  },
  sendCount: {
    type: Number,
    default: 0
  }
});
Sms.plugin(ttl, { ttl: 1000*60*60 });
//  导出
module.exports = mongoose.model('Sms', Sms)
