import Joi from 'joi';
import { EMAIL_REGEX, PASSWORD_REGEX, NAME_REGEX } from '../../common/constants/index.js';

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
};
