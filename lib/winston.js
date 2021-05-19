const winston = require('winston');
const path = require('path');

module.exports = winston.createLogger({
  // log format by format.combine
  format: winston.format.combine(
    winston.format.splat(),
    // datetime format
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    // colors
    winston.format.colorize(),
    // logs format
    winston.format.printf((log) => {
      // show log message if log doesn't have stack trace
      if (log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
      return `[${log.timestamp}] [${log.level}] ${log.message}`;
    })
  ),
  transports: [
    // show logs on console
    new winston.transports.Console(),
    // write logs to files
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/combined.log'),
    }),
  ],
});
