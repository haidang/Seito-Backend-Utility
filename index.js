require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('./lib/winston');
const {I18n} = require('i18n');
const path = require('path');

// Cookie Parser
app.use(cookieParser(process.env.COOKIE_SECRET));
// Set public folder
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.set('views', './views');

const i18n = new I18n();
let locales = process.env.LOCALES ? process.env.LOCALES.split(',') : ['en'];
i18n.configure({
  locales: locales,
  defaultLocale: locales[0],
  directory: path.join(__dirname, 'locales'),
  header: 'accept-language',
  cookie: 'lang',
  queryParameter: 'lang',
  syncFiles: true,
  logDebugFn: function (msg) {
    if (process.env.NODE_ENV === 'debug_lang') {
      console.log('debug', msg);
    }
  },
  logWarnFn: function (msg) {
    console.log('warn', msg);
  },
  logErrorFn: function (msg) {
    console.log('error', msg);
  },
});
app.use(i18n.init);

app.use(function (req, res, next) {
  res.status(404);
  // respond with html page
  if (req.accepts('html')) {
    res.render('errors/404', {url: req.url});
    return;
  }
  // respond with json
  if (req.accepts('json')) {
    res.render('errors/404', {url: req.url});
    return;
  }
  // default to plain-text. send()
  res.type('txt').send(__('Not found'));
});

let port =
  process.env.SERVER_TYPE === 'heroku'
    ? process.env.PORT || 3000
    : process.env.APP_PORT || 3000;
app.listen(port, () => {
  if (
    process.env.NODE_ENV === 'develop' ||
    process.env.SERVER_TYPE === 'heroku'
  ) {
    console.log('App starting on port: ' + port);
  } else {
    logger.info('App starting on port: ' + port);
  }
});
