import { DataTypes } from 'sequelize';
import { USER_TYPE_CUSTOMER, USER_TYPE_STAFF } from '../constants/states.js';
import { EMAIL_REGEX, NAME_REGEX } from '../../common/constants/regex-patterns.js';

// registrationDate key is tracked by Sequelize.createdAt but renamed to registrationDate
export const UsersSchema = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: NAME_REGEX,
      len: [3, 50],
    },
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure uniqueness
    validate: {
      is: EMAIL_REGEX,
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
