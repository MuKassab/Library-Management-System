import { Router } from 'express';

import { validate } from '../../common/middlewares/validation.js';
import { UserBorrowedBooksValidation } from '../validation/index.js';
import { UserBorrowedBooksController } from '../controller/index.js';

const router = Router();

router.get(
  '/overdue',
  validate(UserBorrowedBooksValidation.listOverdueBooks),
  UserBorrowedBooksController.listOverdueBooks,
);

export default router;
