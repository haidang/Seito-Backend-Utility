const config = require("../bin/config");
// const passport = require("passport");
const { __ } = require("i18n");
const Account = require("../database").Account;

function getLogout(req, res, next) {
  res.clearCookie("token");
  res.clearCookie("U_ID");
  res.clearCookie("U_EMAIL");
  req.logout();
  res.status(200).json({ success: true, message: "Logout successfully" });
}
function postLogin(req, res, next) {
  // console.log(res.body);
  if (!req.err && req.user) {
    // let maxAge = req.body.remember ? false : 24 * 60 * 60 * 1000; // 1 day
    // let sessionOpts = { signed: true, maxAge: maxAge, httpOnly: true };

    res.status(200).json({
      success: true,
      token: req.user.token,
    });
    return;
  }

  res.status(404).json({
    success: false,
    message: "Not Found",
  });
}
function getLogin(req, res, next) {
  const data = {
    title: __("Login") + " | " + config.env.APP_NAME,
    template: config.templates.path,
    appFirstName: config.app.firstName,
    appLastName: config.app.lastName,
  };

  res.render("auth/login", data);
}
function getRegister(req, res, next) {
  const data = {
    title: __("Register") + " | " + config.env.APP_NAME,
    template: config.templates.path,
    appFirstName: config.app.firstName,
    appLastName: config.app.lastName,
  };

  res.render("auth/register", data);
}
function getForgotPassword(req, res, next) {
  const data = {
    title: __("Forgot Password") + " | " + config.env.APP_NAME,
    template: config.templates.path,
    appFirstName: config.app.firstName,
    appLastName: config.app.lastName,
  };

  res.render("auth/register", data);
}
function getForgotPassword(req, res, next) {
  const data = {
    title: __("Forgot Password") + " | " + config.env.APP_NAME,
    template: config.templates.path,
    appFirstName: config.app.firstName,
    appLastName: config.app.lastName,
  };

  res.render("auth/forgot-password", data);
}

module.exports = {
  getLogin,
  getRegister,
  getForgotPassword,
  postLogin,
  getLogout,
};
