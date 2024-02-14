import { DataTypes } from 'sequelize';
import { USER_TYPE_CUSTOMER, USER_TYPE_STAFF } from '../constants/states.js';

export const UsersSchema = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    isAlpha: true,
    notEmpty: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure uniqueness
    validate: {
      isEmail: true, // Validate email format
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    notEmpty: true,
  },

  userType: {
    type: DataTypes.ENUM,
    values: [USER_TYPE_STAFF, USER_TYPE_CUSTOMER],
  },
};
