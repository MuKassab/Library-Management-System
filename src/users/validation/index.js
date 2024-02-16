import Joi from 'joi';
import { EMAIL_REGEX, PASSWORD_REGEX, NAME_REGEX } from '../../common/constants/index.js';
import { PaginationLimitSchema, PaginationSkipSchema } from '../../common/validation/index.js';

export const UsersValidation = {
  registerUser: {
    body: {
      name: Joi.string()
        .min(3)
        .max(50)
        .pattern(NAME_REGEX)
        .required(),

      password: Joi.string()
        .min(3)
        .max(50)
        .pattern(PASSWORD_REGEX)
        .required(),

      email: Joi.string()
        .pattern(EMAIL_REGEX)
        .required(),
    },
  },

  authenticateUser: {
    body: {
      email: Joi.string()
        .pattern(EMAIL_REGEX)
        .required(),

      password: Joi.string()
        .min(3)
        .max(50)
        .pattern(PASSWORD_REGEX)
        .required(),
    },
  },

  updateUser: {
    params: {
      id: Joi.number().integer().min(1).required(),
    },

    body: {
      name: Joi.string()
        .min(3)
        .max(50)
        .pattern(NAME_REGEX),

      password: Joi.string()
        .min(3)
        .max(50)
        .pattern(PASSWORD_REGEX),

      email: Joi.string()
        .pattern(EMAIL_REGEX),
    },
  },

  deleteUser: {
    params: {
      id: Joi.number().integer().min(1).required(),
    },
  },

  getUser: {
    params: {
      id: Joi.number().integer().min(1).required(),
    },
  },

  listUsers: {
    query: {
      limit: PaginationLimitSchema,
      skip: PaginationSkipSchema,

      // TODO: Add boolean to select only users that have books borrowed now
      // TODO: Add fuzzy search
    },
  },

  borrowBook: {
    params: {
      id: Joi.number().integer().min(1).required(),
      bookId: Joi.number().integer().min(1).required(),
    },

    body: {
      returnDate: Joi.date().iso().greater('now').required(),
    },
  },

  returnBook: {
    params: {
      id: Joi.number().integer().min(1).required(),
      bookId: Joi.number().integer().min(1).required(),
    },
  },

  listUserBorrowedBooks: {
    params: {
      id: Joi.number().integer().min(1).required(),
    },

    query: {
      limit: PaginationLimitSchema,
      skip: PaginationSkipSchema,
    },
  },
};
