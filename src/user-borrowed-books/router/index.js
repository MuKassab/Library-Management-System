import { Router } from 'express';

import UserBorrowedBooksRouter from './user-borrowed-books.js';

const router = Router();

router.use(UserBorrowedBooksRouter);

export default router;
