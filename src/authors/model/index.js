import { Sequelize } from 'sequelize';
import { sequelize } from '../../common/database/db.js';
import { AUTHORS_MODEL_NAME, AUTHORS_TABLE_NAME } from './constants.js';
import { AuthorsSchema } from './schema.js';

const Authors = sequelize.define(
  AUTHORS_MODEL_NAME,
  AuthorsSchema,
  {
    tableName: AUTHORS_TABLE_NAME,

    // Add trigram indexes on the fields for efficient fuzzy searching
    // MUST apply => CREATE EXTENSION IF NOT EXISTS pg_trgm;
    indexes: [
      {
        name: 'name_trgm_idx',
        fields: [Sequelize.literal('name gin_trgm_ops')],
        using: 'gin',
      },
    ],
  },
);

export default Authors;
