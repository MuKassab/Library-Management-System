import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_MAX_LIMIT,
  PAGINATION_MIN_LIMIT,
  SORT_DIRECTION_ASCENDING,
  SORT_DIRECTION_DESCENDING,
} from '../../../src/common/constants/pagination.js';

export const PaginationLimitParameter = {
  in: 'query',
  name: 'limit',
  schema: {
    type: 'Number',
    default: PAGINATION_DEFAULT_LIMIT,
    minimum: PAGINATION_MIN_LIMIT,
    maximum: PAGINATION_MAX_LIMIT,
  },
  description: 'Number of returned rows',
};

export const PaginationSkipParameter = {
  in: 'query',
  name: 'skip',
  schema: {
    type: 'Number',
    default: 0,
    minimum: 0,
  },
  description: 'Number of skipped rows',
};

export const SortingMethodParameter = {
  in: 'query',
  name: 'sortingMethod',
  schema: {
    type: 'String',
    default: SORT_DIRECTION_DESCENDING,
    enum: [SORT_DIRECTION_ASCENDING, SORT_DIRECTION_DESCENDING],
  },
  description: 'Sorting direction for rows',
};
