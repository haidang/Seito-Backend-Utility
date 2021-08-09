"use strict";

const passport = require("passport");
const LocalStrategy = require("./strategy/passport_local.strategy");
const JWTStrategy = require("./strategy/passport_jwt.strategy");

passport.use("local", LocalStrategy);
passport.use("jwt", JWTStrategy);

module.exports = passport;
