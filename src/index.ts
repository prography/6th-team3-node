import 'reflect-metadata';
import app from './app';
import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development';

let path;

if (env === 'production') path = `${__dirname}/../.env.prod`;
else path = `${__dirname}/../.env.dev`;

dotenv.config({ path });

const HOST = process.env.HOST || 'localhost';
const PORT = Number(process.env.PORT || 1234);

const startApplication = async () => {
  app.listen(PORT, HOST, () => {
    console.log(`server is running on ${HOST}:${PORT}`);
  });
};

startApplication();
