export const AddBookRequestSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      example: 'The Journey of Life',
    },
    authorId: {
      type: 'string',
      example: '8',
    },
    ISBN: {
      type: 'string',
      example: '978-1-4028-9462-6',
    },
    totalQuantity: {
      type: 'string',
      example: '15',
    },
    shelfLocation: {
      type: 'string',
      example: 'AB 21 C',
    },
  },
};

export const AddBookResponseSchema = {
  type: 'object',
  properties: {
    book: {
      type: 'object',
      properties: {
        borrowedCount: {
          type: 'number',
          example: '0',
        },
        id: {
          type: 'number',
          example: '7',
        },
        title: {
          type: 'string',
          example: 'The Journey of Life',
        },
        authorId: {
          type: 'number',
          example: '8',
        },
        ISBN: {
          type: 'string',
          example: '978-1-4028-9462-6',
        },
        totalQuantity: {
          type: 'number',
          example: '15',
        },
        availableQuantity: {
          type: 'number',
          example: '15',
        },
        shelfLocation: {
          type: 'string',
          example: 'AB 21 C',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          example: '2024-02-16T15:20:36.982Z',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2024-02-16T15:20:36.982Z',
        },
      },
    },
  },
};

export const UpdateBookRequestSchema = AddBookRequestSchema;

export const UpdateBookResponseSchema = AddBookResponseSchema;

export const ListBooksResponseSchema = {
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
          authorId: {
            type: 'number',
            example: '7',
          },
          ISBN: {
            type: 'string',
            example: '978-1-4028-9462-6',
          },
          totalQuantity: {
            type: 'number',
            example: '20',
          },
          availableQuantity: {
            type: 'number',
            example: '18',
          },
          shelfLocation: {
            type: 'string',
            example: 'AB 21 C',
          },
          borrowedCount: {
            type: 'number',
            example: '6',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-02-16T00:02:47.011Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-02-16T06:54:55.241Z',
          },
          Author: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                example: 'FuzzySearch',
              },
            },
          },
        },
      },
      example: [
        {
          id: 4,
          title: 'Fourth Added Book',
          authorId: 7,
          ISBN: '978-1-4028-9462-6',
          totalQuantity: 20,
          availableQuantity: 18,
          shelfLocation: 'AB 21 C',
          borrowedCount: 6,
          createdAt: '2024-02-16T00:02:47.011Z',
          updatedAt: '2024-02-16T06:54:55.241Z',
          Author: {
            name: 'FuzzySearch',
          },
        },
      ],
    },
    count: {
      type: 'number',
      example: '6',
    },
  },
};
