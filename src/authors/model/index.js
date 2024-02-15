import { sequelize } from '../../common/database/db.js';
import { AUTHORS_MODEL_NAME, AUTHORS_TABLE_NAME } from './constants.js';
import { AuthorsSchema } from './schema.js';

const Authors = sequelize.define(
  AUTHORS_MODEL_NAME,
  AuthorsSchema,
  {
    tableName: AUTHORS_TABLE_NAME,
  },
);

export default Authors;
