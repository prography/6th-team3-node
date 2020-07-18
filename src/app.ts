import express from 'express';
import bodyParser from 'body-parser';
import { useExpressServer } from 'routing-controllers';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
useExpressServer(app, {
  cors: true,
  controllers: [`${__dirname}/controllers/**`],
});

export default app;
