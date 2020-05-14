import dotenv from 'dotenv';

dotenv.config();
const env = process.env.NODE_ENV || 'development';

let path;

if (env === 'production') path = `${__dirname}/../../.env.prod`;
else path = `${__dirname}/../../.env.dev`;

const envFound = dotenv.config({ path });
if (envFound.error) {
  throw new Error(`⚠️  Couldn't find .env.${env} file  ⚠️`);
}

const config = {
  env,
  host: process.env.HOST,
  port: process.env.PORT,
  database: {
    url: process.env.DATABASE_URI,
    user: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
  },
  logger: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/api',
  },
};

export default config;
