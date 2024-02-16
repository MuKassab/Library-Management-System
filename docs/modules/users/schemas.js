export const RegisterNewUserRequestSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'John Doe',
    },
    email: {
      type: 'string',
      example: 'John_doe@domain.com',
    },
    password: {
      type: 'string',
      example: 'password',
    },
  },
};

export const RegisterNewUserResponseSchema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: '35',
        },
        name: {
          type: 'string',
          example: 'John Doe',
        },
        email: {
          type: 'string',
          example: 'John_doe@domain.com',
        },
        userType: {
          type: 'string',
          example: '@users/types/customer',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          example: '2024-02-16T06:09:42.401Z',
        },
        registrationDate: {
          type: 'string',
          format: 'date-time',
          example: '2024-02-16T06:09:42.401Z',
        },
      },
    },
  },
};

export const ListUsersResponseSchema = {
  type: 'object',
  properties: {
    users: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            example: '1',
          },
          name: {
            type: 'string',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            example: 'john_doe@gmail.com',
          },
          userType: {
            type: 'string',
            example: '@users/types/staff',
          },
          registrationDate: {
            type: 'string',
            format: 'date-time',
            example: '2024-02-14T00:32:04.952Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-02-14T00:32:04.952Z',
          },
        },
      },
      example: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john_doe@gmail.com',
          userType: '@users/types/staff',
          registrationDate: '2024-02-14T00:32:04.952Z',
          updatedAt: '2024-02-14T00:32:04.952Z',
        },
      ],
    },
    count: {
      type: 'number',
      example: '23',
    },
  },
};

export const BorrowBookRequestSchema = {
  type: 'object',
  properties: {
    returnDate: {
      type: 'string',
      format: 'date',
      example: '2024-02-20',
    },
  },
};

export const BorrowBookResponseSchema = {
  type: 'object',
  properties: {
    userBorrowedBook: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: '9',
        },
        userId: {
          type: 'number',
          example: '3',
        },
        bookId: {
          type: 'number',
          example: '4',
        },
        borrowedDate: {
          type: 'string',
          format: 'date',
          example: '2024-02-16',
        },
        returnDate: {
          type: 'string',
          format: 'date',
          example: '2024-02-20',
        },
        borrowState: {
          type: 'string',
          example: '@borrowed-book/state/pending',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          example: '2024-02-16T06:37:51.168Z',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2024-02-16T06:37:51.168Z',
        },
      },
    },
  },
};

export const ReturnBookResponseSchema = {
  type: 'object',
  properties: {
    userBorrowedBook: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: '9',
        },
        userId: {
          type: 'number',
          example: '3',
        },
        bookId: {
          type: 'number',
          example: '4',
        },
        borrowedDate: {
          type: 'string',
          format: 'date',
          example: '2024-02-16',
        },
        returnDate: {
          type: 'string',
          format: 'date',
          example: '2024-02-20',
        },
        borrowState: {
          type: 'string',
          example: '@borrowed-book/state/returned',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2024-02-16T06:37:51.168Z',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          example: '2024-02-16T06:38:29.785Z',
        },
      },
    },
  },
};

export const ListUserBorrowedBooksResponseSchema = {
  type: 'object',
  properties: {
    books: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            example: '4',
          },
          title: {
            type: 'string',
            example: 'Fourth Added Book',
          },
          borrowState: {
            type: 'string',
            example: '@borrowed-book/state/pending',
          },
        },
      },
      example: [
        {
          id: 4,
          title: 'Fourth Added Book',
          borrowState: '@borrowed-book/state/pending',
        },
      ],
    },
    count: {
      type: 'number',
      example: '7',
    },
  },
};
