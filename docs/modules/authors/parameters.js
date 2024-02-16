export const AuthorIdParameter = {
  in: 'path',
  name: 'id',
  required: true,
  schema: { type: 'number', example: 1 },
  description: 'Author id',
};
