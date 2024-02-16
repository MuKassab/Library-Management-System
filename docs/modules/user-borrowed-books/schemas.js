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

export const ExportBorrowedBooksResponseSchema = {
  type: 'object',
  properties: {
    csv: {
      type: 'string',
      example: 'userName,title,borrowedDate,returnDate,returnedDate,borrowState\r\nJohn Doe,Fourth Added Book,2024-02-16,2024-02-20,2024-02-16,@borrowed-book/state/returned',
    },
  },
};
