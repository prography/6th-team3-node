import 'reflect-metadata';
import config from './config';
import Logger from './loaders/logger';
import app from './app';

const HOST = config.host || 'localhost';
const PORT = Number(config.port || 1234);

const startApplication = async () => {
  app.listen(PORT, HOST, () => {
    Logger.info(`server is running on ${HOST}:${PORT}`);
  });
};

startApplication();
