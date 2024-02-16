import Books from '../../books/model/index.js';
import { sequelize } from '../../common/database/db.js';
import Users from '../../users/model/index.js';
import {
  USER_BORROWED_BOOKS_MODEL_NAME,
  USER_BORROWED_BOOKS_TABLE_NAME,
} from './constants.js';
import { UserBorrowedBooksSchema } from './schema.js';

const UserBorrowedBooks = sequelize.define(
  USER_BORROWED_BOOKS_MODEL_NAME,
  UserBorrowedBooksSchema,
  {
    tableName: USER_BORROWED_BOOKS_TABLE_NAME,

    indexes: [
      {
        fields: ['userId', 'bookId'],
        // The uniqueness is set to false as the user can borrow the book multiple times
        unique: false,
      },
      {
        fields: ['borrowState'],
        unique: false,
      },
    ],
  },
);

// Define Relation for this table
UserBorrowedBooks.belongsTo(Users, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Users.hasMany(UserBorrowedBooks, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

UserBorrowedBooks.belongsTo(Books, {
  foreignKey: 'bookId',
  onDelete: 'CASCADE',
});

Books.hasMany(UserBorrowedBooks, {
  foreignKey: 'bookId',
  onDelete: 'CASCADE',
});

export default UserBorrowedBooks;
