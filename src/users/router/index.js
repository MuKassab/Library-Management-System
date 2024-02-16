import { Router } from 'express';

import UsersRouter from './users.js';
import BooksRouter from './books.js';

const router = Router();

router.use(UsersRouter);
router.use(BooksRouter);

export default router;
