import { Router } from 'express';

import BooksRouter from './books.js';

const router = Router();

router.use(BooksRouter);

export default router;
