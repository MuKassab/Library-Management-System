import {
  BOOK_NOT_AVAILABLE,
  BOOK_NOT_FOUND,
  DATA_VALIDATION_FAILED,
  EMAIL_IS_USED,
  INVALID_RETURN_DATE,
  RATE_LIMIT_EXCEEDED,
  USER_DOES_NOT_HAVE_BOOK,
  USER_HAS_BOOK,
  USER_NOT_FOUND,
} from '../../../src/common/constants/error-codes.js';
import { USERS_TAG } from '../../tags.js';
import { PaginationLimitParameter, PaginationSkipParameter } from '../common/parameters.js';
import { BookIdParameter, UserIdParameter } from './parameters.js';
import {
  AuthenticateUserRequestSchema,
  AuthenticateUserResponseSchema,
  BorrowBookRequestSchema,
  BorrowBookResponseSchema,
  ListUserBorrowedBooksResponseSchema,
  ListUsersResponseSchema,
  RegisterNewUserRequestSchema,
  RegisterNewUserResponseSchema,
  ReturnBookResponseSchema,
} from './schemas.js';

const UsersDocs = {
  '/v0/users/register': {
    post: {
      tags: [USERS_TAG],
      summary: 'Registers new user',
      description: `
      ### Notes:
        - Email must be not used before
      `,

      requestBody: {
        content: {
          'application/json': {
            schema: RegisterNewUserRequestSchema,
          },
        },
      },

      responses: {
        201: {
          description: 'User created successfully',
          content: {
            'application/json': {
              schema: RegisterNewUserResponseSchema,
            },
          },
        },

        400: {
          description: `
          - Bad payload, errorCode: ${DATA_VALIDATION_FAILED}
          `,
        },

        422: {
          description: `
          - E-mail is already used, errorCode: ${EMAIL_IS_USED}
          `,
        },
      },
    },
  },

  '/v0/users/login': {
    post: {
      tags: [USERS_TAG],
      summary: 'Authenticates user',
      description: `
      ### Notes:
        - The short term and long term are only for testing purposes 
        - Short term => valid for 2 minutes only
        - Long term => valid for 1 day
      `,

      requestBody: {
        content: {
          'application/json': {
            schema: AuthenticateUserRequestSchema,
          },
        },
      },

      responses: {
        200: {
          description: 'User Authenticated successfully',
          content: {
            'application/json': {
              schema: AuthenticateUserResponseSchema,
            },
          },
        },

        400: {
          description: `
          - Bad payload, errorCode: ${DATA_VALIDATION_FAILED}
          `,
        },

        422: {
          description: `
          - Invalid email or password, errorCode: ${USER_NOT_FOUND}
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

  '/v0/users/{id}': {
    patch: {
      tags: [USERS_TAG],
      summary: 'Update user data',
      description: `
      ### Notes:
        - If E-mail is passed it must be not used before 
      `,
      parameters: [UserIdParameter],
      requestBody: {
        content: {
          'application/json': {
            schema: RegisterNewUserRequestSchema,
          },
        },
      },

      responses: {
        200: {
          description: 'User updated successfully',
          content: {
            'application/json': {
              schema: RegisterNewUserResponseSchema,
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
          - User with passed id is not found, errorCode: ${USER_NOT_FOUND}
          `,
        },

        422: {
          description: `E-mail is already used, errorCode: ${EMAIL_IS_USED}`,
        },
      },
    },

    get: {
      tags: [USERS_TAG],
      summary: 'Gets user',
      description: `
      ### Notes:
        - If E-mail is passed it must be not used before 
      `,
      parameters: [UserIdParameter],

      responses: {
        200: {
          description: 'User returned successfully',
          content: {
            'application/json': {
              schema: RegisterNewUserResponseSchema,
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
          User with passed id is not found, errorCode: ${USER_NOT_FOUND}
          `,
        },
      },
    },

    delete: {
      tags: [USERS_TAG],
      summary: 'Deletes user',
      description: `
      ### Notes:
        - User won't be deleted if he has borrowed books
        - User will be deleted with his borrow history
      `,
      parameters: [UserIdParameter],

      responses: {
        204: {
          description: `
          - User deleted successfully
          `,
        },

        400: {
          description: `
          - Bad payload, errorCode: ${DATA_VALIDATION_FAILED}
          `,
        },

        404: {
          description: `
          - User with passed id is not found, errorCode: ${USER_NOT_FOUND}
          `,
        },

        422: {
          description: `
          - User has borrowed books, errorCode: ${USER_HAS_BOOK}
          `,
        },
      },
    },
  },

  '/v0/users': {
    get: {
      tags: [USERS_TAG],
      summary: 'Lists system users (Paginated)',

      parameters: [PaginationLimitParameter, PaginationSkipParameter],

      responses: {
        200: {
          description: 'Users returned successfully',
          content: {
            'application/json': {
              schema: ListUsersResponseSchema,
            },
          },
        },
      },
    },
  },

  '/v0/users/{id}/books/{bookId}/borrow': {
    post: {
      tags: [USERS_TAG],
      summary: 'Borrow a book',

      parameters: [UserIdParameter, BookIdParameter],

      requestBody: {
        content: {
          'application/json': {
            schema: BorrowBookRequestSchema,
          },
        },
      },

      responses: {
        200: {
          description: 'Book borrowed successfully',
          content: {
            'application/json': {
              schema: BorrowBookResponseSchema,
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
          - User with passed id is not found, errorCode: ${USER_NOT_FOUND}
          - Book with passed id is not found, errorCode: ${BOOK_NOT_FOUND}
          `,
        },

        422: {
          description: `
          - User hasn't borrowed book, errorCode: ${USER_DOES_NOT_HAVE_BOOK}
          - Book's quantity is not sufficient, errorCode: ${BOOK_NOT_AVAILABLE}
          - Return date must be greater than or equal today, errorCode: ${INVALID_RETURN_DATE}
          `,
        },
      },
    },
  },

  '/v0/users/{id}/books/{bookId}/return': {
    post: {
      tags: [USERS_TAG],
      summary: 'Returns borrowed book',

      parameters: [UserIdParameter, BookIdParameter],

      responses: {
        200: {
          description: 'Book returned successfully',
          content: {
            'application/json': {
              schema: ReturnBookResponseSchema,
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
          - User with passed id is not found, errorCode: ${USER_NOT_FOUND}
          - Book with passed id is not found, errorCode: ${BOOK_NOT_FOUND}
          `,
        },

        422: {
          description: `
          - User hasn't borrowed book, errorCode: ${USER_DOES_NOT_HAVE_BOOK}
          `,
        },
      },
    },
  },

  '/v0/users/{id}/books': {
    post: {
      tags: [USERS_TAG],
      summary: 'List user borrowed books',

      parameters: [PaginationLimitParameter, PaginationSkipParameter],

      responses: {
        200: {
          description: 'Books returned successfully',
          content: {
            'application/json': {
              schema: ListUserBorrowedBooksResponseSchema,
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
          - User with passed id is not found, errorCode: ${USER_NOT_FOUND}
          `,
        },
      },
    },
  },
};

export default UsersDocs;
