import { Router } from 'express';

import { validate } from '../../common/middlewares/validation.js';
import { UsersValidation } from '../validation/index.js';
import { UsersController } from '../controller/index.js';

const router = Router();

router.post(
  '/:id/books/:bookId/borrow',
  validate(UsersValidation.borrowBook),
  UsersController.borrowBook,
);

router.post(
  '/:id/books/:bookId/return',
  validate(UsersValidation.returnBook),
  UsersController.returnBook,
);

router.get(
  '/:id/books',
  validate(UsersValidation.listUserBorrowedBooks),
  UsersController.listUserBorrowedBooks,
);

export default router;
