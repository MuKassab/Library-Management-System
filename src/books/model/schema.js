import { DataTypes } from 'sequelize';
import httpStatus from 'http-status';

import { CustomAPIError } from '../../common/lib/index.js';
import { INVALID_ISBN } from '../../common/constants/index.js';
import { isValidISBN } from '../service/helpers/index.js';

const { BAD_REQUEST } = httpStatus;

export const BooksSchema = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
    notEmpty: true,
    unique: true,
  },

  // The validation on this field is done by the foreign key restraints
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  // ISBN is currently a 13 digit number with 4 hyphens and the last digit is generated based on
  // all the previous digits.
  // It's not defined as unique as mistakes happen and more than one book share the same ISBN
  ISBN: {
    type: DataTypes.STRING(17), // Adjust the length based on ISBN-13
    allowNull: false,
    validate: {
      isISBN(value) {
        if (!isValidISBN(value)) {
          throw new CustomAPIError({
            message: 'Invalid ISBN check sum',
            status: BAD_REQUEST,
            errorCode: INVALID_ISBN,
            meta: { source: 'Database' },
          });
        }
      },
    },
  },

  totalQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },

  availableQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      isLessThanOrEqual(value) {
        if (value > this.totalQuantity) {
          throw new Error('Available quantity must be less than or equal to total quantity');
        }
      },
    },
  },

  shelfLocation: {
    type: DataTypes.STRING,
    allowNull: false,
    notEmpty: true,
  },

  // This tracks how many time the book was borrowed (popularity)
  borrowedCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
};
