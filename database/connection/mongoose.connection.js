const config = require("../../bin/config");
const mongoose = require("mongoose");
const logger = require("../../lib/winston");

const checkDBServer = config.env.NODE_ENV === "dev" ? "dev" : "prod";
const mongoDBUri =
  config.env.NODE_ENV === "prod"
    ? "mongodb+srv://" +
      config.database[checkDBServer].DB_USER +
      ":" +
      config.database[checkDBServer].DB_PASSWORD +
      "@" +
      config.database[checkDBServer].DB_SERVER +
      "/" +
      config.database[checkDBServer].DB_SERVER +
      "/" +
      config.database[checkDBServer].DB_NAME +
      "?retryWrites=true&w=majority"
    : "mongodb://" +
      config.database[checkDBServer].DB_USER +
      ":" +
      config.database[checkDBServer].DB_PASSWORD +
      "@" +
      config.database[checkDBServer].DB_SERVER +
      ":" +
      config.database[checkDBServer].DB_PORT +
      "/" +
      config.database[checkDBServer].DB_NAME +
      "?authSource=admin&directConnection=true&ssl=false&appname=" +
      config.env.APP_NAME;
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5 * 1000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 60 * 1000, // Close sockets after 1 minute of inactivity
};
// console.log(checkDBServer, mongoDBUri, opts);
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
