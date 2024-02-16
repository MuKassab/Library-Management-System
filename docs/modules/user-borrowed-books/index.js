import {
  DATA_VALIDATION_FAILED,
} from '../../../src/common/constants/error-codes.js';
import { USER_BORROWED_BOOKS_TAG } from '../../tags.js';
import { PaginationLimitParameter, PaginationSkipParameter } from '../common/parameters.js';
import {
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
};

export default UserBorrowedBooksDocs;
