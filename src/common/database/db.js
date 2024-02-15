import { Sequelize } from 'sequelize';

import { config } from '../config/index.js';

// Return sequelize instance of the connection to the database
export const sequelize = new Sequelize(config.POSTGRES_URI);
