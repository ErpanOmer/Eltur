const mongoose = require('mongoose');
const config = require('../../db.config.js')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const User = new Schema({
  name: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    require: true
  },
  sex: {
    type: Number,
    default: 0
  },
  age: {
    type: Number,
    default: 0
  },
  birthday: {
    type: String,
    default: '1990-01-01'
  },
  mobile: {
    type: String,
    unique: true,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  token: {
    type: String
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

// 添加用户保存时中间件对password进行bcrypt加密,这样保证用户密码只有用户本人知道
User.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
// 校验用户输入密码是否正确
User.methods.comparePassword = function(passw, cb) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
module.exports = mongoose.model('User', User);
