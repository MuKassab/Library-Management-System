import { DataTypes } from 'sequelize';
import { BORROWED_BOOK_STATES } from '../constants/states.js';

export const UserBorrowedBooksSchema = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },

  // The validation on this field is done by the foreign key restraints
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  // The validation on this field is done by the foreign key restraints
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  borrowedDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  returnDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  borrowState: {
    type: DataTypes.ENUM,
    values: BORROWED_BOOK_STATES,
  },
};
