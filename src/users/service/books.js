import _ from 'lodash';
import httpStatus from 'http-status';
import { Op } from 'sequelize';
import moment from 'moment';

import { CustomAPIError } from '../../common/lib/index.js';
import {
  BOOK_NOT_AVAILABLE,
  BOOK_NOT_FOUND,
  INVALID_RETURN_DATE,
  USER_DOES_NOT_HAVE_BOOK,
  USER_HAS_BOOK,
  USER_NOT_FOUND,
} from '../../common/constants/index.js';
import { compareDates } from '../../common/utils/index.js';
import {
  BORROWED_BOOK_STATE_OVERDUE,
  BORROWED_BOOK_STATE_PENDING,
  BORROWED_BOOK_STATE_RETURNED,
} from '../../user-borrowed-books/constants/states.js';
import Books from '../../books/model/index.js';
import UserBorrowedBooks from '../../user-borrowed-books/model/index.js';
import Users from '../model/index.js';
import { sequelize } from '../../common/database/db.js';

const { UNPROCESSABLE_ENTITY, NOT_FOUND } = httpStatus;

export const UserBooksService = {
  /**
   * Borrows specified book for user
   * TODO: add redis lock for this service on bookId to prevent borrowing the same book more than the available amount
   *
   * @param {Object} args
   * @param {String} [args.userId]
   * @param {String} [args.bookId]
   * @param {String} [args.returnDate]
   *
   * @returns {Promise<{Object}>} {userBorrowedBook}
   */
  async borrowBook({ userId, bookId, returnDate }) {
    // validate user and book existence
    const userPromise = Users.findByPk(userId, { attributes: ['id'] });
    const bookPromise = Books.findByPk(bookId, { attributes: ['id', 'availableQuantity'] });

    const [user, book] = await Promise.all([userPromise, bookPromise]);

    if (_.isNil(user)) {
      throw new CustomAPIError({
        message: 'User does not exist.',
        status: NOT_FOUND,
        errorCode: USER_NOT_FOUND,
      });
    }

    if (_.isNil(book)) {
      throw new CustomAPIError({
        message: 'Book does not exist.',
        status: NOT_FOUND,
        errorCode: BOOK_NOT_FOUND,
      });
    }

    // Ensure user can't borrow same book more than once if he still hasn't returned it
    const userHasBorrowedBook = await UserBorrowedBooks.findOne({
      where: {
        userId,
        bookId,
        borrowState: {
          [Op.or]: [BORROWED_BOOK_STATE_PENDING, BORROWED_BOOK_STATE_OVERDUE],
        },
      },
    });

    if (!_.isNil(userHasBorrowedBook)) {
      throw new CustomAPIError({
        message: 'User already has the book',
        status: UNPROCESSABLE_ENTITY,
        errorCode: USER_HAS_BOOK,
      });
    }

    // Ensure book still has available quantity
    if (book.availableQuantity === 0) {
      throw new CustomAPIError({
        message: 'Book is not available',
        status: UNPROCESSABLE_ENTITY,
        errorCode: BOOK_NOT_AVAILABLE,
      });
    }

    // Ensure return date is the same or after now
    const borrowedDate = moment().format('YYYY-MM-DD');
    const formattedReturnDate = moment(returnDate).format('YYYY-MM-DD');

    if (compareDates(formattedReturnDate, borrowedDate) === -1) {
      throw new CustomAPIError({
        message: 'Return date MUST be greater than or equal today',
        status: UNPROCESSABLE_ENTITY,
        errorCode: INVALID_RETURN_DATE,
      });
    }

    const dbTransaction = await sequelize.transaction();

    let userBorrowedBook;

    try {
      // Update book data
      const updateBookPromise = book.increment(
        { availableQuantity: -1, borrowedCount: 1 },
        { transaction: dbTransaction },
      );

      const userBorrowedBookPromise = UserBorrowedBooks.create({
        userId,
        bookId,
        borrowedDate,
        returnDate,
        borrowState: BORROWED_BOOK_STATE_PENDING,
      });

      [userBorrowedBook] = await Promise.all([
        userBorrowedBookPromise,
        updateBookPromise,
      ]);

      await dbTransaction.commit();
    } catch (err) {
      await dbTransaction.rollback();

      throw new CustomAPIError({
        message: 'Error during borrowing book',
        meta: { error: err, userId, bookId },
      });
    }

    return userBorrowedBook;
  },

  /**
   * Returns specified book from user
   *
   * @param {Object} args
   * @param {String} [args.userId]
   * @param {String} [args.bookId]
   *
   * @returns {Promise<Object>} {userBorrowedBook}
   */
  async returnBook({ userId, bookId }) {
    // validate user and book existence
    const userPromise = Users.findByPk(userId, { attributes: ['id'] });
    const bookPromise = Books.findByPk(bookId, { attributes: ['id', 'availableQuantity'] });

    const [user, book] = await Promise.all([userPromise, bookPromise]);

    if (_.isNil(user)) {
      throw new CustomAPIError({
        message: 'User does not exist.',
        status: NOT_FOUND,
        errorCode: USER_NOT_FOUND,
      });
    }

    if (_.isNil(book)) {
      throw new CustomAPIError({
        message: 'Book does not exist.',
        status: NOT_FOUND,
        errorCode: BOOK_NOT_FOUND,
      });
    }

    // Ensure user has the book before he can return it
    const userBorrowedBook = await UserBorrowedBooks.findOne({
      where: {
        userId,
        bookId,
        borrowState: {
          [Op.or]: [BORROWED_BOOK_STATE_PENDING, BORROWED_BOOK_STATE_OVERDUE],
        },
      },
    });

    if (_.isNil(userBorrowedBook)) {
      throw new CustomAPIError({
        message: 'User has not borrowed the book',
        status: NOT_FOUND,
        errorCode: USER_DOES_NOT_HAVE_BOOK,
      });
    }

    const dbTransaction = await sequelize.transaction();

    try {
      await Promise.all([
        // Update book data (return the book to available quantity)
        book.increment({ availableQuantity: 1 }, { transaction: dbTransaction }),
        userBorrowedBook.update(
          {
            borrowState: BORROWED_BOOK_STATE_RETURNED,
            returnedDate: new Date(),
          },
          { transaction: dbTransaction },
        ),
      ]);

      await dbTransaction.commit();
    } catch (err) {
      await dbTransaction.rollback();

      throw new CustomAPIError({
        message: 'Error during returning book',
        meta: { error: err, userId, bookId, userBorrowedBook },
      });
    }

    return userBorrowedBook;
  },

  /**
   * Returns list of user borrowed books
   *
   * @param {Object} args
   * @param {String} [args.userId]
   * @param {Number} [args.limit]
   * @param {Number} [args.skip]
   *
   * @returns {Promise<[Object]>} {books}
   */
  async listUserBorrowedBooks({ userId, limit, skip }) {
    // validate user and book existence
    const user = await Users.findByPk(userId, { attributes: ['id'] });

    if (_.isNil(user)) {
      throw new CustomAPIError({
        message: 'User does not exist.',
        status: NOT_FOUND,
        errorCode: USER_NOT_FOUND,
      });
    }

    const { count, rows: books } = await UserBorrowedBooks.findAndCountAll({
      limit,
      offset: skip,
      attributes: ['borrowState'],
      include: [
        {
          model: Books,
          attributes: ['id', 'title'],
        },
      ],
      where: {
        userId,
        borrowState: {
          [Op.or]: [BORROWED_BOOK_STATE_PENDING, BORROWED_BOOK_STATE_OVERDUE],
        },
      },
      // sort the borrowed books documents by id as there db does not select data in the same order every time
      order: [['id', 'ASC']],
    });

    const formattedBooks = books.map(({ borrowState, Book }) => ({
      ...Book.toJSON(),
      borrowState,
    }));

    return { books: formattedBooks, count };
  },
};
