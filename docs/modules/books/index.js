import {
  AUTHOR_NOT_FOUND,
  BOOK_EXISTS,
  BOOK_IS_BORROWED,
  BOOK_NOT_FOUND,
  DATA_VALIDATION_FAILED,
  INVALID_BOOK_QUANTITY,
} from '../../../src/common/constants/error-codes.js';
import { BOOKS_TAG } from '../../tags.js';
import {
  PaginationLimitParameter,
  PaginationSkipParameter,
  SortingDirectionParameter,
} from '../common/parameters.js';
import {
  BookIdParameter,
  FuzzySearchQueryParameter,
  SortByQueryParameter,
} from './parameters.js';
import {
  AddBookRequestSchema,
  AddBookResponseSchema,
  ListBooksResponseSchema,
  UpdateBookRequestSchema,
  UpdateBookResponseSchema,
} from './schemas.js';

const BooksDocs = {
  '/v0/books': {
    post: {
      tags: [BOOKS_TAG],
      summary: 'Adds new book',
      description: `
      ### Notes:
        - Name must be unique
        - AuthorId must exist in the system
      `,

      requestBody: {
        content: {
          'application/json': {
            schema: AddBookRequestSchema,
          },
        },
      },

      responses: {
        201: {
          description: 'Book created successfully',
          content: {
            'application/json': {
              schema: AddBookResponseSchema,
            },
          },
        },

        400: {
          description: `
          - Bad payload, errorCode: ${DATA_VALIDATION_FAILED}
          `,
        },

        404: {
          description: `
          - Author with passed id is not found, errorCode: ${AUTHOR_NOT_FOUND}
          `,
        },

        422: {
          description: `
          - Book name is not unique, errorCode: ${BOOK_EXISTS}
          `,
        },
      },
    },

    get: {
      tags: [BOOKS_TAG],
      summary: 'Lists books (Paginated)',
      description: `
      ### Notes:
        - fuzzySearch is applied to title, ISBN, and author's name
        - Data can be sorted by book popularity (borrowedCount)
      `,

      parameters: [
        FuzzySearchQueryParameter,
        PaginationLimitParameter,
        PaginationSkipParameter,
        SortingDirectionParameter,
        SortByQueryParameter,
      ],

      responses: {
        200: {
          description: 'Books returned successfully',
          content: {
            'application/json': {
              schema: ListBooksResponseSchema,
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

  '/v0/books/{id}': {
    patch: {
      tags: [BOOKS_TAG],
      summary: 'Update book data',
      description: `
      ### Notes:
        - Name must be unique
        - AuthorId must exist in the system
      `,
      parameters: [BookIdParameter],
      requestBody: {
        content: {
          'application/json': {
            schema: UpdateBookRequestSchema,
          },
        },
      },

      responses: {
        200: {
          description: 'Book updated successfully',
          content: {
            'application/json': {
              schema: UpdateBookResponseSchema,
            },
          },
        },

        400: {
          description: `
          - Bad payload, errorCode: ${DATA_VALIDATION_FAILED}
          `,
        },

        404: {
          description: `
          - Book with passed id is not found, errorCode: ${BOOK_NOT_FOUND}
          - Author with passed id is not found, errorCode: ${AUTHOR_NOT_FOUND}
          `,
        },

        422: {
          description: `
          - Book name is not unique, errorCode: ${BOOK_EXISTS}
          - Total quantity is less than current borrowed count, errorCode: ${INVALID_BOOK_QUANTITY}
          `,
        },
      },
    },

    delete: {
      tags: [BOOKS_TAG],
      summary: 'Deletes book',
      description: `
      ### Notes:
        - Book won't be deleted if it is borrowed by customers
        - Book borrow history will be deleted when the book is deleted
      `,
      parameters: [BookIdParameter],

      responses: {
        204: {
          description: `
          - Book deleted successfully
          `,
        },

        400: {
          description: `
          - Bad payload, errorCode: ${DATA_VALIDATION_FAILED}
          `,
        },

        404: {
          description: `
          - Book with passed id is not found, errorCode: ${BOOK_NOT_FOUND}
          `,
        },

        422: {
          description: `
          -Book is currently borrowed by users, errorCode: ${BOOK_IS_BORROWED}
          `,
        },
      },
    },
  },
};

export default BooksDocs;
