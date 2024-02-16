import httpStatus from 'http-status';
import passport from 'passport';
import { CustomAPIError } from '../lib/index.js';
import { JWT_EXPIRED, USER_NOT_AUTHENTICATED } from '../constants/index.js';

const { UNAUTHORIZED } = httpStatus;

export const authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    // this value is specific to passport package
    if (info && info.name === 'TokenExpiredError') {
      return next(new CustomAPIError({
        message: 'Jwt is expired',
        status: UNAUTHORIZED,
        errorCode: JWT_EXPIRED,
      }));
    }

    // failed to validate jwt
    if (error) { return next(error); }

    if (!user) {
      return next(new CustomAPIError({
        message: 'User is not authenticated',
        status: UNAUTHORIZED,
        errorCode: USER_NOT_AUTHENTICATED,
      }));
    }

    req.user = user;

    return next();
  })(req, res, next);
};
