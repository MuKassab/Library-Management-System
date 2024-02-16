import Joi from 'joi';
import { PaginationLimitSchema, PaginationSkipSchema } from '../../common/validation/index.js';
import { isValidISBN } from '../service/helpers/index.js';
import { SORT_DIRECTION_ASCENDING, SORT_DIRECTION_DESCENDING } from '../../common/constants/pagination.js';
import { SORT_BY_BORROWED_COUNT_KEY } from '../../common/constants/index.js';

const joiIsValidISBN = (value, helpers) => {
  if (isValidISBN(value)) {
    return value; // The value is valid
  }

  return helpers.error('any.invalid'); // The value is not valid
};

export const BooksValidation = {
  addBook: {
    body: {
      title: Joi.string().required(),

      authorId: Joi.number().integer().min(1).required(),

      ISBN: Joi.string().length(17).custom(joiIsValidISBN).required(),

      totalQuantity: Joi.number().integer().min(0).required(),

      shelfLocation: Joi.string().required(),
    },
  },

  updateBook: {
    params: {
      id: Joi.number().integer().min(1).required(),
    },

    body: {
      title: Joi.string().required(),

      authorId: Joi.number().integer().min(1),

      ISBN: Joi.string().length(17).custom(joiIsValidISBN),

      totalQuantity: Joi.number().integer().min(0),

      shelfLocation: Joi.string(),
    },
  },

  deleteBook: {
    params: {
      id: Joi.number().integer().min(1).required(),
    },
  },

  listBooks: {
    query: {
      limit: PaginationLimitSchema,
      skip: PaginationSkipSchema,

      fuzzySearch: Joi.string(),

      sortBy: Joi.string().valid(SORT_BY_BORROWED_COUNT_KEY),
      sortDirection: Joi
        .string()
        .valid(SORT_DIRECTION_ASCENDING, SORT_DIRECTION_DESCENDING)
        .default(SORT_DIRECTION_DESCENDING),
    },
  },
};
