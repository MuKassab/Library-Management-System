import 'dotenv/config';

export const config = {
  PORT: process.env.PORT,

  POSTGRES_URI: process.env.POSTGRES_URI,
  REDIS_URI: process.env.REDIS_URI,
};
