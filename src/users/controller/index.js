import httpStatus from 'http-status';
import { UsersService } from '../service/users.js';

const { CREATED } = httpStatus;

export const UsersController = {
  async registerUser(req, res, next) {
    try {
      const { body } = req;

      const user = await UsersService.registerUser({ ...body });

      return res.status(CREATED).json({ user });
    } catch (err) {
      return next(err);
    }
  },
};
