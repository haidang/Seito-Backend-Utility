const config = require("../../../bin/config");
const Strategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");

const Account = require("../../../database/model").Account;

const opts = {
  usernameField: "email",
  passwordField: "password",
  session: true,
};

module.exports = new Strategy(opts, async function (email, password, callback) {
  // console.log(email, password);
  await Account.findOne({ email: email }, function (err, account) {
    if (err) return callback(err, false);

    if (!account) {
      return callback({ message: "Account not found" }, false, {
        message: "Account is not available",
      });
    }

    if (!account.comparePassword(password)) {
      return callback(null, false, {
        message: "Incorrect password",
      });
    }
    let account_result = {
      id: account[config.database.underscoreId],
      email: account.email,
    };
    account_result.token = jwt.sign(account_result, config.passport.secret, {
      expiresIn: config.passport.expiresIn,
    });
    account_result.name = account.name;

    return callback(null, account_result);
  });
});
