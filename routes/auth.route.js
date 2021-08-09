var express = require("express");

// let passport = require("../middleware/passport");
var router = express.Router();

const controller = require("../controller").Auth;

/* POST account log in. */
router.post("login", controller.getLogin);

module.exports = router;
