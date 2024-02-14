import { USERS_MODEL_NAME, USERS_TABLE_NAME } from './constants.js';
import { UsersSchema } from './schema.js';
import sequelize from '../../db.js';

const Users = sequelize.define(
  USERS_MODEL_NAME,
  UsersSchema,
  {
    tableName: USERS_TABLE_NAME,

    // override Sequelize createdAt timestamp field name
    createdAt: 'registrationDate',
  },
);

export default Users;
