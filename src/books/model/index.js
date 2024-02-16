import { Sequelize } from 'sequelize';

import { sequelize } from '../../common/database/db.js';
import Authors from '../../authors/model/index.js';
import { BOOKS_MODEL_NAME, BOOKS_TABLE_NAME } from './constants.js';
import { BooksSchema } from './schema.js';

const Books = sequelize.define(
  BOOKS_MODEL_NAME,
  BooksSchema,
  {
    tableName: BOOKS_TABLE_NAME,

    // Add trigram indexes on the fields for efficient fuzzy searching
    // MUST apply => CREATE EXTENSION IF NOT EXISTS pg_trgm;
    indexes: [
      {
        name: 'title_trgm_idx',
        fields: [Sequelize.literal('title gin_trgm_ops')],
        using: 'gin',
      },
      {
        name: 'isbn_trgm_idx',
        fields: [Sequelize.literal('"ISBN" gin_trgm_ops')],
        using: 'gin',
      },
    ],
  },
);

Books.belongsTo(Authors, { foreignKey: 'authorId', onDelete: 'CASCADE' });
Authors.hasMany(Books, { foreignKey: 'authorId', onDelete: 'CASCADE' });

export default Books;
