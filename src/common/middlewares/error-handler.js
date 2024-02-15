import httpStatus from 'http-status';

const { INTERNAL_SERVER_ERROR } = httpStatus;

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack); // Log the error for debugging

  const statusCode = err.status || INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    message: err.message ? err.message : 'Something went wrong',
    status: err.status ? err.status : INTERNAL_SERVER_ERROR,
    errorCode: err.errorCode,
    meta: err.meta,
  });
};
