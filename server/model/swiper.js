const mongoose = require('mongoose');
const config = require('../db.config.js')
const Schema = mongoose.Schema;
//  Schema
const Swiper = new Schema({
  list: {
    type: Array,
    default: []
  },
  createdTime: {
    type: Number,
    default: 0
  },
  updateTime: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Swiper', Swiper);
