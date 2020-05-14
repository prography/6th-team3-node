import winston from 'winston';
import config from '../config';

const transports = [];

if (config.env !== 'development') {
  // production
  transports.push(new winston.transports.Console());
} else {
  // development
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        // winston.format.colorize(),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        /*
        winston.format.printf(
          data => `${data.timestamp} [${data.level}] : ${data.message}`
        ),
        */
        winston.format.cli(),
        winston.format.splat()
      ),
    })
  );
}

const LoggerInstance = winston.createLogger({
  level: process.env.LOG_LEVEL,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.prettyPrint()
  ),
  transports,
});

export default LoggerInstance;
