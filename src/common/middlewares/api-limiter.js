import httpStatus from 'http-status';
import { getRedisClient } from '../lib/redis.js';
import CustomAPIError from '../lib/custom-api-error.js';
import { RATE_LIMIT_EXCEEDED } from '../constants/error-codes.js';

const { TOO_MANY_REQUESTS } = httpStatus;

export const apiRateLimiter = async (req, res, next) => {
  const redis = getRedisClient();

  // must be done after authentication to achieve the required effect
  // otherwise assume it is the same guest user
  const userId = req.user ? req.user.id : 'guest';
  const key = `user:${userId}:requests`;

  const currentCount = await redis.incr(key);

  if (currentCount === 1) {
    // Set expiration for the key if it's the first request
    await redis.expire(key, 60); // Set expiration time to 1 minute (60 seconds)
  }

  if (currentCount > 10) {
    // If the count exceeds 10, throw an error
    // return res.status(TOO_MANY_REQUESTS).json({ error: 'Rate limit exceeded' });
    throw new CustomAPIError({
      message: 'Rate limit exceeded',
      status: TOO_MANY_REQUESTS,
      errorCode: RATE_LIMIT_EXCEEDED,
      meta: { userId },
    });
  }

  // Continue with the request
  return next();
};
