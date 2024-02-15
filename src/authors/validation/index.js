import Joi from 'joi';
import { NAME_REGEX } from '../../common/constants/index.js';
import { PaginationLimitSchema, PaginationSkipSchema } from '../../common/validation/index.js';

export const AuthorsValidation = {
  addAuthor: {
    body: {
      name: Joi.string()
        .min(3)
        .max(50)
        .pattern(NAME_REGEX)
        .required(),

      nationality: Joi.string()
        .min(3)
        .max(30)
        .pattern(NAME_REGEX)
        .required(),

      biography: Joi.string().allow('').required(),

      // TODO: it is better to format date as .format('YYYY-MM-DD') but this required joi-date dependency
      // TODO: this should be done for insert and update of birth/death dates
      birthDate: Joi.date().max('now').required(),

      deathDate: Joi.date().greater(Joi.ref('birthDate')),
    },
  },

  updateAuthor: {
    params: {
      id: Joi.number().integer().min(1).required(),
    },

    body: {
      name: Joi.string()
        .min(3)
        .max(50)
        .pattern(NAME_REGEX),

      nationality: Joi.string()
        .min(3)
        .max(30)
        .pattern(NAME_REGEX),

      biography: Joi.string(),

      birthDate: Joi.date().max('now'),

      // if birth date is passed then death date should be before it
      // if birth date is not passed then the field should be less than now
      deathDate: Joi.when('birthDate', {
        is: Joi.exist(),
        then: Joi.date().greater(Joi.ref('birthDate')),
        otherwise: Joi.date().max('now'),
      }),
    },
  },

  deleteAuthor: {
    params: {
      id: Joi.number().integer().min(1).required(),
    },
  },

  listAuthors: {
    query: {
      limit: PaginationLimitSchema,
      skip: PaginationSkipSchema,

      // TODO: Add fuzzy search
    },
  },
};
