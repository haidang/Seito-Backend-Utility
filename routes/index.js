var express = require("express");
var router = express.Router();

const controller = require("../controller");

router.get("/", controller.Home);

router.get("/login", controller.Auth.getLogin);
router.get("/logout", controller.Auth.getLogout);
router.get("/account/register", controller.Auth.getRegister);
router.get("/account/forgot-password", controller.Auth.getForgotPassword);

module.exports = router;
