import 'reflect-metadata';
import config from './config';
import Logger from './loaders/logger';
import app from './app';

const HOST = config.host || '0.0.0.0';
const PORT = Number(config.port || 1234);

const startApplication = async () => {
  app.listen(PORT, '0.0.0.0', () => {
    // Logger.info(`server is running on ${HOST}:${PORT}`);
    console.log(`server is running on ${HOST}:${PORT}`);
  });
};

startApplication();
