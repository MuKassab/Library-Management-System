import {
  DATA_VALIDATION_FAILED, JWT_EXPIRED, RATE_LIMIT_EXCEEDED, USER_NOT_AUTHENTICATED,
} from '../../../src/common/constants/error-codes.js';
import { USER_BORROWED_BOOKS_TAG } from '../../tags.js';
import { PaginationLimitParameter, PaginationSkipParameter } from '../common/parameters.js';
import { BorrowStateQueryParameter, EndDateQueryParameter, StartDateQueryParameter } from './parameters.js';
import {
  ExportBorrowedBooksResponseSchema,
  ListOverdueBooksResponseSchema,
} from './schemas.js';

const UserBorrowedBooksDocs = {
  '/v0/user-borrowed-books/overdue': {
    get: {
      tags: [USER_BORROWED_BOOKS_TAG],
      summary: 'Lists overdue books in system (Paginated)',
      description: `
        - It lists overdue borrowed books and the count of the overdue borrowings for each book
      `,

      parameters: [PaginationLimitParameter, PaginationSkipParameter],

      responses: {
        200: {
          description: 'Books created successfully',
          content: {
            'application/json': {
              schema: ListOverdueBooksResponseSchema,
            },
          },
        },

        400: {
          description: `
          - Bad payload, errorCode: ${DATA_VALIDATION_FAILED}
          `,
        },
      },
    },
  },

  '/v0/user-borrowed-books/csv': {
    get: {
      tags: [USER_BORROWED_BOOKS_TAG],
      summary: 'Exports borrowed books in specific period in csv format',
      description: `
        - The data is expected to be formatted on frontend
        - The data can be filtered by dates and borrow state
      `,

      parameters: [StartDateQueryParameter, EndDateQueryParameter, BorrowStateQueryParameter],

      responses: {
        200: {
          description: 'CSV exported successfully',
          content: {
            'application/json': {
              schema: ExportBorrowedBooksResponseSchema,
            },
          },
        },

        401: {
          description: `
          - Unauthorized, errorCode: ${JWT_EXPIRED} || ${USER_NOT_AUTHENTICATED}
          `,
        },

        400: {
          description: `
          - Bad payload, errorCode: ${DATA_VALIDATION_FAILED}
          `,
        },

        429: {
          description: `
          - Rate limit exceeded, errorCode: ${RATE_LIMIT_EXCEEDED}
          `,
        },
      },
    },
  },
};

export default UserBorrowedBooksDocs;
