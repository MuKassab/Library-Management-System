import { Router } from 'express';

import { validate } from '../../common/middlewares/validation.js';
import { BooksValidation } from '../validation/index.js';
import { BooksController } from '../controller/index.js';

const router = Router();

router.post(
  '/',
  validate(BooksValidation.addBook),
  BooksController.addBook,
);

router.patch(
  '/:id',
  validate(BooksValidation.updateBook),
  BooksController.updateBook,
);

router.delete(
  '/:id',
  validate(BooksValidation.deleteBook),
  BooksController.deleteBook,
);

router.get(
  '/',
  validate(BooksValidation.listBooks),
  BooksController.listBooks,
);

export default router;
