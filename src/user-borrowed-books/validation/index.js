import Joi from 'joi';
import moment from 'moment';
import { PaginationLimitSchema, PaginationSkipSchema } from '../../common/validation/index.js';

export const UserBorrowedBooksValidation = {
  listOverdueBooks: {
    query: {
      limit: PaginationLimitSchema,
      skip: PaginationSkipSchema,
    },
  },
  exportBorrowedBooks: {
    query: {
      startDate: Joi.date().iso().default(() => moment().subtract(1, 'month').toDate()),
      endDate: Joi.date().iso().default(() => new Date()),
    },
  },
};
