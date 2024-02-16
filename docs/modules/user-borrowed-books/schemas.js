export const ListOverdueBooksResponseSchema = {
  type: 'object',
  properties: {
    books: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            example: '3',
          },
          title: {
            type: 'string',
            example: 'Third Added Book',
          },
          overdueCount: {
            type: 'string',
            example: '1',
          },
        },
      },
      example: [
        {
          id: 3,
          title: 'Third Added Book',
          overdueCount: '1',
        },
      ],
    },
    count: {
      type: 'string',
      example: '3',
    },
  },
};
