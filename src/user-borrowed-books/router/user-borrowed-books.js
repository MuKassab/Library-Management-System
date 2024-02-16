import { Router } from 'express';

import { validate, authenticate, apiRateLimiter } from '../../common/middlewares/index.js';
import { UserBorrowedBooksValidation } from '../validation/index.js';
import { UserBorrowedBooksController } from '../controller/index.js';

const router = Router();

router.get(
  '/overdue',
  validate(UserBorrowedBooksValidation.listOverdueBooks),
  UserBorrowedBooksController.listOverdueBooks,
);

router.get(
  '/csv',
  authenticate,
  apiRateLimiter,
  validate(UserBorrowedBooksValidation.exportBorrowedBooks),
  UserBorrowedBooksController.exportBorrowedBooks,
);

export default router;
