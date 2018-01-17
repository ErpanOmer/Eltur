const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;
const User = require('./Model/User.js');
const config = require('../db.config.js')
module.exports = function(passport) {
    passport.use(new Strategy(
        function(token, done) {
            User.findOne({
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
