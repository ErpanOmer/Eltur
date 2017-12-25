const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;

const AdminUser = require('./AdminUser.db.js');
const config = require('../../db.config.js')

module.exports = function(passport) {
    passport.use(new Strategy(
        function(token, done) {
            AdminUser.findOne({
                token: token
            }, function(err, user) {
                if (err) {
                    return done(err, { message: '用户名错误!' });
                }
                if (!user) {
                    return done(null, false, { message: '用户名错误!' });
                }
                return done(null, user);
            });
        }
    ));
};
