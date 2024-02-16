import httpStatus from 'http-status';
import { UsersService } from '../service/users.js';
import { UserBooksService } from '../service/books.js';

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

  async authenticateUser(req, res, next) {
    try {
      const { body } = req;

      const data = await UsersService.authenticateUser({ ...body });

      return res.status(OK).json(data);
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

  async getUser(req, res, next) {
    try {
      const { params: { id: userId } } = req;

      const user = await UsersService.getUser({ userId });

      return res.status(OK).json({ user });
    } catch (err) {
      return next(err);
    }
  },

  async listUsers(req, res, next) {
    try {
      const { query } = req;

      const data = await UsersService.listUsers({ ...query });

      return res.status(OK).json(data);
    } catch (err) {
      return next(err);
    }
  },

  async borrowBook(req, res, next) {
    try {
      const {
        params: { id: userId, bookId },
        body: { returnDate },
      } = req;

      const userBorrowedBook = await UserBooksService.borrowBook({ userId, bookId, returnDate });

      return res.status(OK).json({ userBorrowedBook });
    } catch (err) {
      return next(err);
    }
  },

  async returnBook(req, res, next) {
    try {
      const {
        params: { id: userId, bookId },
      } = req;

      const userBorrowedBook = await UserBooksService.returnBook({ userId, bookId });

      return res.status(OK).json({ userBorrowedBook });
    } catch (err) {
      return next(err);
    }
  },

  async listUserBorrowedBooks(req, res, next) {
    try {
      const {
        params: { id: userId },
        query,
      } = req;

      const data = await UserBooksService.listUserBorrowedBooks({ userId, ...query });

      return res.status(OK).json(data);
    } catch (err) {
      return next(err);
    }
  },
};
