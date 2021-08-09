const express = require("express");
const path = require("path");
var logger = require("morgan");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const i18n = require("i18n");

const config = require("./bin/config");

const passport = require("./middleware/passport");
const seeder = require("./database/seed");

const app = express();
/* Request logs */
app.use(logger("dev"));
/* Routes */
const router = require("./routes");
// var authRouter = require("./routes/auth.route");

/* View engine */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
/* Public folder */
app.use(express.static(path.join(__dirname, "public")));
/* Cookie parser */
app.use(cookieParser(process.env.COOKIE_SECRET));
/* Parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: false }));
/* Parse application/json */
app.use(bodyParser.json());

// i18n
i18n.configure(config.i18n);
app.use(i18n.init);
app.use((req, res, next) => {
  let local = config.env.LANG_DEFAULT;
  if (req.cookies && req.cookies.lang && req.cookies.lang != "") {
    local = req.cookies.lang;
  }
  app.locals.defaultLang = local;
  res.cookie("lang", local, {
    maxAge: 900 * 1000,
    httpOnly: true,
  });
  req.setLocale(local);
  i18n.setLocale(local);

  next();
});

app.use("/", router);

seeder();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts("html")) {
    res.render("errors/404", {
      title: "Not Found" + " - " + config.env.APP_NAME,
      url: req.url,
    });
    return;
  }

  // respond with json
  if (req.accepts("json")) {
    res.render("errors/500", { url: req.url });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send(__("Not found"));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error =
    req.app.get("env") === "development" || req.app.get("env") === "dev"
      ? err
      : {};
  console.log(err.message);
  // render the error page
  res.status(err.status || 500);
  res.render("errors/404");
});

module.exports = app;
