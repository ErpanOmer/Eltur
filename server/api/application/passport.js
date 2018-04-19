const passport = require('passport');
const User = require('../../model/user.js');
const config = require('../../db.config.js');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const options = {}
options.jwtFromRequest = ExtractJwt.fromHeader('token');
options.secretOrKey = 'YouLoveMe';

module.exports = function(passport) {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
      User.findOne({mobile: jwt_payload.mobile}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              return done(null, user);
          } else {
              return done(null, false);
              // or you could create a new account
          }
      });
  }));
}
