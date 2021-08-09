var express = require("express");
var router = express.Router();

// const homeRoute = require("./auth.route");

let passport = require("../middleware/passport");
const controller = require("../controller");

router.get("/", controller.getLogin);
// router.get("/login", controller.Auth);

module.exports = router;
