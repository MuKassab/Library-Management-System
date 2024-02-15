import httpStatus from 'http-status';

import { SERVER_ERROR } from '../constants/error-codes.js';

const { INTERNAL_SERVER_ERROR } = httpStatus;

class CustomAPIError extends Error {
  constructor({ message = 'Something went wrong', status = INTERNAL_SERVER_ERROR, errorCode = SERVER_ERROR, meta = {} }) {
    super(message);
    this.status = status;
    this.errorCode = errorCode;
    this.meta = meta;
    this.name = this.constructor.name;
  }
}

export default CustomAPIError;
