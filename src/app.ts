import express from 'express';
import { useExpressServer } from 'routing-controllers';

const app = express();

useExpressServer(app, {
  routePrefix: '/api',
  controllers: [`${__dirname}/controllers/**`],
});

export default app;
