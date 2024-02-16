import httpStatus from 'http-status';
import { UserBorrowedBooksService } from '../service/index.js';

const { OK } = httpStatus;

export const UserBorrowedBooksController = {
  async listOverdueBooks(req, res, next) {
    try {
      const { query } = req;

      const data = await UserBorrowedBooksService.listOverdueBooks({ ...query });

      return res.status(OK).json(data);
    } catch (err) {
      return next(err);
    }
  },

  async exportBorrowedBooks(req, res, next) {
    try {
      const { query } = req;

      const csv = await UserBorrowedBooksService.exportBorrowedBooks({ ...query });

      return res.status(OK).send({ csv });
    } catch (err) {
      return next(err);
    }
  },
};
