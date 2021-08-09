require("dotenv").config();

module.exports = {
  env: {
    // APP SETTINGS
    PORT:
      process.env.SERVER_TYPE === "heroku"
        ? process.env.PORT
        : process.env.LOCAL_PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
    LOCAL_DOMAIN: process.env.LOCAL_DOMAIN || "dang.localhost.authentication",
    APP_NAME: process.env.APP_NAME || "Seito Backend Utility",
  },
  database: {
    // DATABASE SETTINGS
    DB_SERVER: process.env.DB_SERVER || "cluster0.zwy2b.mongodb.net",
    DB_NAME: process.env.DB_NAME || "Authentication",
    DB_USER: process.env.DB_USER || "admin",
    DB_PASSWORD: process.env.DB_PASSWORD || "Admin123321",
    DB_LOCAL_PORT: process.env.DB_LOCAL_PORT || 27017,
    underscoreId: "_id",
  },
  passport: {
    secret:
      process.env.PASSPORT_SECRET_KEY || "@Dang0-PASSPORT_SECRET_KEY-0Dang@",
    // expiresIn: Math.floor(Date.now() / 1000) + 60 * 1,
    expiresIn: "60s", // 1 minute
  },
  i18n: {
    locales: process.env.LANG_SUPPORTED
      ? process.env.LANG_SUPPORTED.split(",")
      : ["en", "vn"],
    syncFiles: true,
    register: global,
    directory: __dirname + "/i18n",
    cookie: "lang",
    objectNotation: true,
    interpolation: { escapeValue: false },
  },
  logs: {
    path: "./logs/",
    timeFormat: "YYYY-MM-DD HH:mm:ss:SSS",
  },
  templates: {
    name: "AdminLTE",
    path: "/templates/AdminLTE",
  },
  app: {
    firstName: "Seito Backend",
    lastName: "Utility",
  },
};
