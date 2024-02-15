import { DataTypes } from 'sequelize';
import { NAME_REGEX } from '../../common/constants/regex-patterns.js';

export const AuthorsSchema = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },

  // For simplicity this is the unique identifier for the author
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: NAME_REGEX,
      len: [3, 50],
    },
  },

  nationality: {
    type: DataTypes.STRING,
    allowNull: false,
    isAlpha: true,
    notEmpty: true,
  },

  biography: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  deathDate: {
    type: DataTypes.DATEONLY,
  },
};
