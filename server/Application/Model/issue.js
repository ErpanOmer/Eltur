const mongoose = require('mongoose');
const config = require('../../db.config.js')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const Issue = new Schema({
  question: {
    type: String,
    default: ''
  },
  cover: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  category: {
    type: Number,
    default: ''
  },
  views: {
    type: Number,
    default: 0
  },
  alreadyAnswered: {
    type: Boolean,
    default: false
  },
  answerText: {
    type: String,
    default: ''
  },
  fabulous:{
    type: Number,
    default: 0
  },
  createdTime: {
    type: Number,
    default: 0
  },
  updateTime: {
    type: Number,
    default: 0
  }
})
