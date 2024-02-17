import { config as extractEnvironmentVariables } from 'dotenv';

extractEnvironmentVariables();

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  POSTGRES_URI: process.env.POSTGRES_URI,
  POSTGRES_TEST_URI: process.env.POSTGRES_TEST_URI,
  REDIS_URI: process.env.REDIS_URI,

  HASH_PEPPER: process.env.HASH_PEPPER,

  JWT_SECRET: process.env.JWT_SECRET,
};
