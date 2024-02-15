import httpStatus from 'http-status';
import { UsersService } from '../service/users.js';

const { CREATED, OK, NO_CONTENT } = httpStatus;

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

  async updateUser(req, res, next) {
    try {
      const {
        params: { id: userId },
        body,
      } = req;

      const user = await UsersService.updateUser({ userId, ...body });

      return res.status(OK).json({ user });
    } catch (err) {
      return next(err);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const { params: { id: userId } } = req;

      await UsersService.deleteUser({ userId });

      return res.status(NO_CONTENT).send();
    } catch (err) {
      return next(err);
    }
  },
};
