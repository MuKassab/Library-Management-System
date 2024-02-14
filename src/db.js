import { Sequelize } from 'sequelize';

import { config } from './common/config/index.js';

const sequelize = new Sequelize(config.POSTGRES_URI);

// Return sequelize instance of the connection to the database
export default sequelize;
