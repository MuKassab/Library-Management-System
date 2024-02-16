import { PaginationLimitSchema, PaginationSkipSchema } from '../../common/validation/index.js';

export const UserBorrowedBooksValidation = {
  listOverdueBooks: {
    query: {
      limit: PaginationLimitSchema,
      skip: PaginationSkipSchema,
    },
  },
};
