import { Op } from 'sequelize';
import { BORROWED_BOOK_STATE_OVERDUE, BORROWED_BOOK_STATE_PENDING } from '../constants/states.js';
import UserBorrowedBooks from '../model/index.js';
import { USER_BORROWED_BOOKS_MODEL_NAME, USER_BORROWED_BOOKS_TABLE_NAME } from '../model/constants.js';
import { BOOKS_MODEL_NAME, BOOKS_TABLE_NAME } from '../../books/model/constants.js';
import { sequelize } from '../../common/database/db.js';
import Books from '../../books/model/index.js';

export const UserBorrowedBooksService = {
  /**
   * Lists overdue borrowed books in the system
   *
   * @param {Object} args
   * @param {Number} [args.limit]
   * @param {Number} [args.skip]
   *
   * @returns {Promise<{[Object]}>} {books: [{...bookData}], count}
   */
  async listOverdueBooks({ limit, skip }) {
    const resultQuery = `
      SELECT "Book"."id",
              "Book"."title",
              COUNT("${USER_BORROWED_BOOKS_TABLE_NAME}"."id") as "overdueCount"
      FROM "${USER_BORROWED_BOOKS_TABLE_NAME}"
        JOIN "${BOOKS_TABLE_NAME}" as "${BOOKS_MODEL_NAME}" ON "${USER_BORROWED_BOOKS_TABLE_NAME}"."bookId" = "Book"."id"
      WHERE "${USER_BORROWED_BOOKS_TABLE_NAME}"."borrowState" = '${BORROWED_BOOK_STATE_OVERDUE}'
      GROUP BY "${BOOKS_MODEL_NAME}"."id"
      LIMIT ${limit} OFFSET ${skip};
    `;

    const countQuery = `
    SELECT SUM("rowCount") as "count"
    From (
        SELECT 1 as "rowCount"
        FROM "${USER_BORROWED_BOOKS_TABLE_NAME}"
          JOIN "${BOOKS_TABLE_NAME}" as "${BOOKS_MODEL_NAME}" ON "${USER_BORROWED_BOOKS_TABLE_NAME}"."bookId" = "Book"."id"
        WHERE "${USER_BORROWED_BOOKS_TABLE_NAME}"."borrowState" = '${BORROWED_BOOK_STATE_OVERDUE}'
        GROUP BY "${BOOKS_MODEL_NAME}"."id" ) As subquery
    `;

    const [books, [{ count }]] = await Promise.all([
      sequelize.query(resultQuery, { type: sequelize.QueryTypes.SELECT }),
      sequelize.query(countQuery, { type: sequelize.QueryTypes.SELECT }),
    ]);

    return { books, count };
  },

  // The following service is not used because Sequelize has bug when using findAndCountAll with group
  // https://github.com/sequelize/sequelize/issues/9109
  /**
   * Lists overdue borrowed books in the system
   *
   * @param {Object} args
   * @param {Number} [args.limit]
   * @param {Number} [args.skip]
   *
   * @returns {Promise<{[Object]}>} {books: [{...bookData}], count}
   */
  async listOverdueBooksV1({ limit, skip }) {
    const { count, rows: books } = await UserBorrowedBooks.findAndCountAll({
      attributes: [[sequelize.fn('COUNT', sequelize.literal(`"${USER_BORROWED_BOOKS_MODEL_NAME}"."id"`)), 'overdueCount']],
      where: {
        borrowState: BORROWED_BOOK_STATE_OVERDUE,
      },
      include: [
        {
          model: Books,
          attributes: ['id', 'title'],
        },
      ],
      group: ['Book.id'],
      limit,
      offset: skip,
    });

    return { books, count };
  },


  /**
   * Related to the validateBorrowedBooksStateJob
   * Changes Pending borrowed books state to Overdue if return date has passed
   *
   * @returns {Promise<>}
   */
  async validateBorrowedBooksState() {
    await UserBorrowedBooks.update(
      { borrowState: BORROWED_BOOK_STATE_OVERDUE },
      {
        where: {
          borrowState: BORROWED_BOOK_STATE_PENDING,
          returnDate: {
            [Op.lt]: new Date(),
          },
        },
      },
    );
  },
};
