export const UserIdParameter = {
  in: 'path',
  name: 'id',
  required: true,
  schema: { type: 'number', example: 1 },
  description: 'User id',
};

export const BookIdParameter = {
  in: 'path',
  name: 'bookId',
  required: true,
  schema: { type: 'number', example: 1 },
  description: 'Book id',
};
