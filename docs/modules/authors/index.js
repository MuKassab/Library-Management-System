import {
  AUTHOR_EXISTS,
  AUTHOR_HAS_BOOKS,
  AUTHOR_NOT_FOUND,
  DATA_VALIDATION_FAILED,
  INVALID_BIRTH_DATE,
  INVALID_DEATH_DATE,
} from '../../../src/common/constants/error-codes.js';
import { AUTHORS_TAG } from '../../tags.js';
import { PaginationLimitParameter, PaginationSkipParameter } from '../common/parameters.js';
import { AuthorIdParameter } from './parameters.js';
import {
  AddAuthorResponseSchema,
  AddAuthorRequestSchema,
  UpdateAuthorRequestSchema,
  UpdateAuthorResponseSchema,
  ListAuthorsResponseSchema,
} from './schemas.js';

const AuthorsDocs = {
  '/v0/authors': {
    post: {
      tags: [AUTHORS_TAG],
      summary: 'Adds new author',
      description: `
      ### Notes:
        - Name must be unique
        - Death Date is optional
      `,

      requestBody: {
        content: {
          'application/json': {
            schema: AddAuthorRequestSchema,
          },
        },
      },

      responses: {
        201: {
          description: 'Author created successfully',
          content: {
            'application/json': {
              schema: AddAuthorResponseSchema,
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
          - Author name is not unique, errorCode: ${AUTHOR_EXISTS}
          `,
        },
      },
    },

    get: {
      tags: [AUTHORS_TAG],
      summary: 'Lists authors (Paginated)',

      parameters: [PaginationLimitParameter, PaginationSkipParameter],

      responses: {
        200: {
          description: 'Authors returned successfully',
          content: {
            'application/json': {
              schema: ListAuthorsResponseSchema,
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

  '/v0/authors/{id}': {
    patch: {
      tags: [AUTHORS_TAG],
      summary: 'Update author data',
      description: `
      ### Notes:
        - Name must be unique
      `,
      parameters: [AuthorIdParameter],
      requestBody: {
        content: {
          'application/json': {
            schema: UpdateAuthorRequestSchema,
          },
        },
      },

      responses: {
        200: {
          description: 'Author updated successfully',
          content: {
            'application/json': {
              schema: UpdateAuthorResponseSchema,
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
          - Author name is not unique, errorCode: ${AUTHOR_EXISTS}
          - Birth date is greater than death date, errorCode: ${INVALID_BIRTH_DATE}
          - Death date is greater than birth date, errorCode: ${INVALID_DEATH_DATE}
          `,
        },
      },
    },

    delete: {
      tags: [AUTHORS_TAG],
      summary: 'Deletes author',
      description: `
      ### Notes:
        - Author won't be deleted if he is related to books
      `,
      parameters: [AuthorIdParameter],

      responses: {
        204: {
          description: `
          - Author deleted successfully
          `,
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
          - Author is related to books, errorCode: ${AUTHOR_HAS_BOOKS}
          `,
        },
      },
    },
  },
};

export default AuthorsDocs;
