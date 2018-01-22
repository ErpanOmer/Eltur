const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;
const AdminUser = require('./Model/AdminUser.js');
const config = require('../db.config.js');
module.exports = function(passport, admin) {
  if (admin) {
    passport.use(new Strategy(
        function(token, done) {
          console.log(done)
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
  }
};
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
