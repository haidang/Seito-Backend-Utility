const config = require("../../bin/config");
const mongoose = require("mongoose");
const logger = require("../../lib/winston");

const mongoDBUri =
  config.database.NODE_ENV === "prod"
    ? "mongodb+srv://" +
      (config.database.DB_USER || "user") +
      ":" +
      (config.database.DB_PASSWORD || "password") +
      "@" +
      (config.database.DB_SERVER || "local") +
      "/" +
      // (config.database.DB_NAME || "test") +
      "?retryWrites=true&w=majority"
    : "mongodb://" +
      (config.database.DB_USER || "user") +
      ":" +
      (config.database.DB_PASSWORD || "password") +
      "@localhost:" +
      (config.database.DB_LOCAL_PORT || "27017") +
      "/";
// (config.database.DB_NAME || "test") +
// "?authSource=admin";
const opts = {
  dbName: config.database.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5 * 1000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 60 * 1000, // Close sockets after 1 minute of inactivity
};
mongoose
  .connect(mongoDBUri, opts)
  .then(() => {
    logger.info("Successfully connect to MongoDB");
  })
  .catch((err) => {
    logger.error("Connection error: " + err.name);
    process.exit();
  });
mongoose.connection.on("disconnected", () => {
  logger.warn("Database disconnected");
});

module.exports = mongoose;
