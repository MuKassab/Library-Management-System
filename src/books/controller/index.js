import httpStatus from 'http-status';
import { BooksService } from '../service/index.js';

const { CREATED, OK, NO_CONTENT } = httpStatus;

export const BooksController = {
  async addBook(req, res, next) {
    try {
      const { body } = req;

      const book = await BooksService.addBook({ ...body });

      return res.status(CREATED).json({ book });
    } catch (err) {
      return next(err);
    }
  },

  async updateBook(req, res, next) {
    try {
      const {
        params: { id: bookId },
        body,
      } = req;

      const book = await BooksService.updateBook({ bookId, ...body });

      return res.status(OK).json({ book });
    } catch (err) {
      return next(err);
    }
  },

  async deleteBook(req, res, next) {
    try {
      const { params: { id: bookId } } = req;

      await BooksService.deleteBook({ bookId });

      return res.status(NO_CONTENT).send();
    } catch (err) {
      return next(err);
    }
  },

  async listBooks(req, res, next) {
    try {
      const { query } = req;

      const data = await BooksService.listBooks({ ...query });

      return res.status(OK).json(data);
    } catch (err) {
      return next(err);
    }
  },
};
