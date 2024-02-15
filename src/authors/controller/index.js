import httpStatus from 'http-status';
import { AuthorsService } from '../service/index.js';

const { CREATED, OK, NO_CONTENT } = httpStatus;

export const AuthorsController = {
  async addAuthor(req, res, next) {
    try {
      const { body } = req;

      const author = await AuthorsService.addAuthor({ ...body });

      return res.status(CREATED).json({ user: author });
    } catch (err) {
      return next(err);
    }
  },

  async updateAuthor(req, res, next) {
    try {
      const {
        params: { id: authorId },
        body,
      } = req;

      const author = await AuthorsService.updateAuthor({ authorId, ...body });

      return res.status(OK).json({ user: author });
    } catch (err) {
      return next(err);
    }
  },

  async deleteAuthor(req, res, next) {
    try {
      const { params: { id: authorId } } = req;

      await AuthorsService.deleteAuthor({ authorId });

      return res.status(NO_CONTENT).send();
    } catch (err) {
      return next(err);
    }
  },

  async listAuthors(req, res, next) {
    try {
      const { query } = req;

      const data = await AuthorsService.listAuthors({ ...query });

      return res.status(OK).json(data);
    } catch (err) {
      return next(err);
    }
  },
};
