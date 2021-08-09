const config = require("../../../bin/config");
// const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const Account = require("../../../database/model").Account;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.jwtFromRequest = ExtractJwt.fromHeader("Authorization");
// opts.jwtFromRequest = ExtractJwt.fromBodyField("token");
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");

opts.secretOrKey = config.passport.secret;
opts.ignoreExpiration = false;

module.exports = new JwtStrategy(opts, async function (jwt_payload, cb) {
  await Account.findOne({ email: jwt_payload.email }, function (err, account) {
    if (err) {
      return cb(err, false);
    }
    if (account) {
      var account_result = {
        id: account[config.database.underscoreId],
        name: account.name,
        email: account.email,
      };
      return cb(null, account_result);
    } else {
      return cb(null, false, { message: "Account is not available" });
    }
  });
});
