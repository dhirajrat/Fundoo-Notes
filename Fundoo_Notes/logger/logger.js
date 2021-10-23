/* eslint-disable linebreak-style */
const { createLogger, transports, format } = require('winston');

const customFormat = format.combine(format.timestamp(), format.printf((info) => `[${info.timestamp}] - [${info.level}] - ${info.message}`));

/**
 * Create Logger
 */
const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = logger;
