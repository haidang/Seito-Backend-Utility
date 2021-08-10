require("dotenv").config();

module.exports = {
  env: {
    // APP SETTINGS
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "dev",
    LOCAL_DOMAIN: process.env.LOCAL_DOMAIN || "localhost",
    APP_NAME: process.env.APP_NAME || "appName",
  },
  database: {
    // DATABASE SETTINGS
    prod: {
      DB_SERVER: process.env.DB_SERVER || "dbServer",
      DB_PORT: process.env.DB_PORT || "",
      DB_NAME: process.env.DB_NAME || "dbName",
      DB_USER: process.env.DB_USER || "user",
      DB_PASSWORD: process.env.DB_PASSWORD || "password",
    },
    dev: {
      DB_SERVER: process.env.DB_LOCAL_SERVER || "localhost",
      DB_PORT: process.env.DB_LOCAL_PORT || 27017,
      DB_NAME: process.env.DB_LOCAL_NAME || "dbName",
      DB_USER: process.env.DB_LOCAL_USER || "user",
      DB_PASSWORD: process.env.DB_LOCAL_PASSWORD || "password",
    },
    underscoreId: "_id",
  },
  passport: {
    secret: process.env.PASSPORT_SECRET_KEY || "secret",
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
