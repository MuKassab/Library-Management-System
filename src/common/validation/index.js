import Joi from 'joi';

import { PAGINATION_DEFAULT_LIMIT, PAGINATION_MAX_LIMIT, PAGINATION_MIN_LIMIT } from '../constants/pagination.js';

export const PaginationLimitSchema = Joi
  .number()
  .min(PAGINATION_MIN_LIMIT)
  .max(PAGINATION_MAX_LIMIT)
  .default(PAGINATION_DEFAULT_LIMIT)
  .allow(-1);

export const PaginationSkipSchema = Joi.number().min(0).default(0);
