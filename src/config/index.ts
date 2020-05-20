import dotenv from 'dotenv';

dotenv.config();
const env = process.env.NODE_ENV || 'development';

let path;
// test 환경에서는 github secrets로 환경변수 설정

if (env === 'production') path = `${__dirname}/../../.env.prod`;
else path = `${__dirname}/../../.env.dev`;

dotenv.config({ path });

/*
if (envFound.error) {
  throw new Error(`⚠️  Couldn't find .env.${env} file  ⚠️`);
}
*/

const config = {
  env,
  host: process.env.HOST,
  port: process.env.PORT,
  database: {
    uri: process.env.DATABASE_URI,
    user: process.env.DATABASE_USER,
    name: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
  },
  logger: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/api',
  },
  auth: {
    kakaoKey: process.env.KAKAO_REST_API_KEY,
    kakaoRedirect: process.env.KAKAO_REDIRECT,
  },
};

export default config;
