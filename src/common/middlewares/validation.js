import httpStatus from 'http-status';
import Joi from 'joi';
import _ from 'lodash';

import { DATA_VALIDATION_FAILED } from '../constants/index.js';
import CustomAPIError from '../lib/custom-api-error.js';

const { BAD_REQUEST } = httpStatus;

const extractValidationErrors = error => error.details.map(detail => ({
  message: detail.message,
  path: detail.path.join('.'),
}));

/**
 * Generates a validation middleware to validate user passed data (params, body and query)
 *
 * @param {Object} schema
 */
export const validate = schema => {
  const { params = {}, body = {}, query = {} } = schema;

  const compliedParamsSchema = Joi.compile(params);
  const compliedBodySchema = Joi.compile(body);
  const compliedQuerySchema = Joi.compile(query);

  // to get all possible errors from validation
  const options = { abortEarly: false };

  // eslint-disable-next-line consistent-return
  return (req, res, next) => {
    if (!_.isEmpty(params)) {
      const { value: validatedParams, error } = compliedParamsSchema.validate(req.params, options);

      if (!_.isNil(error)) {
        throw new CustomAPIError({
          message: 'Params validation failed',
          status: BAD_REQUEST,
          errorCode: DATA_VALIDATION_FAILED,
          meta: { errors: extractValidationErrors(error) },
        });
      }

      // replace passed params with validated params to handle default values for non-required fields
      req.params = validatedParams;
    }

    if (!_.isEmpty(body)) {
      const { value: validatedBody, error } = compliedBodySchema.validate(req.body, options);

      if (!_.isNil(error)) {
        throw new CustomAPIError({
          message: 'Body validation failed',
          status: BAD_REQUEST,
          errorCode: DATA_VALIDATION_FAILED,
          meta: { errors: extractValidationErrors(error) },
        });
      }

      // replace passed body with validated body to handle default values for non-required fields
      req.body = validatedBody;
    }

    if (!_.isEmpty(query)) {
      const { value: validatedQuery, error } = compliedQuerySchema.validate(req.query, options);

      if (!_.isNil(error)) {
        throw new CustomAPIError({
          message: 'Query validation failed',
          status: BAD_REQUEST,
          errorCode: DATA_VALIDATION_FAILED,
          meta: { errors: extractValidationErrors(error) },
        });
      }

      // replace passed query with validated query to handle default values for non-required fields
      req.query = validatedQuery;
    }

    next();
  };
};
