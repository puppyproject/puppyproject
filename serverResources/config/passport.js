var JwtStrategy = require('passport-jwt').Strategy;
var extracter = require('passport-jwt').ExtractJwt.fromBodyField;
var User = require('../schemas/User');
var config = require('./database');

module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = config.secret;
  opts.jwtFromRequest = extracter;
  // passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  //   User.findOne({id: jwt_payload.id}, function(err, user) {
  //         if (err) {
  //             return done(err, false);
  //         }
  //         if (user) {
  //             done(null, user);
  //         } else {
  //             done(null, false);
  //         }
  //     });
  // }));
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account
        }
    });
}));
};
