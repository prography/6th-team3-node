import express from 'express';
import config from './config';
import { useExpressServer } from 'routing-controllers';

const app = express();
useExpressServer(app, {
  routePrefix: config.api.prefix,
  controllers: [`${__dirname}/controllers/**`],
});

export default app;
