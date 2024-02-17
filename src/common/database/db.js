import { Sequelize } from 'sequelize';

import { config } from '../config/index.js';
import { NODE_ENV_DEVELOPMENT, NODE_ENV_TESTING } from '../constants/index.js';

const postgresURI = config.NODE_ENV === NODE_ENV_DEVELOPMENT
  ? config.POSTGRES_URI
  : config.POSTGRES_TEST_URI;

const options = {
  logging: config.NODE_ENV !== NODE_ENV_TESTING,
};

// Return sequelize instance of the connection to the database
export const sequelize = new Sequelize(postgresURI, options);
