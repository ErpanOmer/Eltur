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
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    ));
};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
