const { createLogger, format, transports } = require('winston');
const morgan = require('morgan');

const { timestamp } = format;
const LOG_FILE_NAME = process.env.LOG_FILE_NAME
require('winston-daily-rotate-file');

const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

// eslint-disable-next-line no-shadow
const logFormat = format.printf(({ timestamp, level, message, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${message} `;
  if (metadata && Object.keys(metadata).length) {
    msg += JSON.stringify(metadata);
  }
  return msg;
});

const fileWriterTransport = new transports.DailyRotateFile({
  filename: `logs/${LOG_FILE_NAME}-%DATE%.log`,
  datePattern: 'YYYYMMDD',
  zippedArchive: true,
  maxSize: 5242880,
  maxFiles: 10,
  level: 'info',
  json: true,
  format: format.combine(enumerateErrorFormat(), format.uncolorize(), timestamp(), format.splat(), logFormat),
});

const logger = createLogger({
  level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
  format: format.combine(enumerateErrorFormat(), format.colorize(), timestamp(), format.splat(), logFormat),
  transports: [
    new transports.Console({
      level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    }),
    fileWriterTransport,
  ],
  exitOnError: false,
});

fileWriterTransport.on('rotate', function (oldFilename, newFilename) {
  logger.log('info', 'Log file rotation', {
    oldFilename,
    newFilename,
  });
});

morgan.token('message', (req, res) => res.locals.errorMessage || '');

const getIpFormat = () => (process.env.NODE_ENV === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

// const errorHandler = morgan(errorResponseFormat, {
//   skip: (req, res) => res.statusCode < 400,
//   stream: { write: (message) => logger.error(message.trim()) },
// });

module.exports = {
  successHandler
};