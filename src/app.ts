import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import { useExpressServer } from 'routing-controllers';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
useExpressServer(app, {
  cors: true,
  routePrefix: config.api.prefix,
  controllers: [`${__dirname}/controllers/**`],
});

export default app;
