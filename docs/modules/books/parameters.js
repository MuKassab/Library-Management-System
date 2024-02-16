import { SORT_BY_BORROWED_COUNT_KEY } from '../../../src/common/constants/index.js';

export const BookIdParameter = {
  in: 'path',
  name: 'id',
  required: true,
  schema: { type: 'number', example: 1 },
  description: 'Author id',
};

export const FuzzySearchQueryParameter = {
  in: 'query',
  name: 'fuzzySearch',
  schema: {
    type: 'String',
    example: 'fuzzy',
  },
  description: 'fuzzy search on title, ISBN and author\'s name',
};

export const SortByQueryParameter = {
  in: 'query',
  name: 'sortBy',
  schema: {
    type: 'String',
    enum: [SORT_BY_BORROWED_COUNT_KEY],
  },
  description: 'Sorting field for rows',
};
