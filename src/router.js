import { Router } from 'express';

import UsersRouter from './users/router/index.js';
import AuthorsRouter from './authors/router/index.js';
import BooksRouter from './books/router/index.js';
import UserBorrowedBooksRouter from './user-borrowed-books/router/index.js';

const apiRouter = Router();

apiRouter.use('/users', UsersRouter);
apiRouter.use('/authors', AuthorsRouter);
apiRouter.use('/books', BooksRouter);
apiRouter.use('/user-borrowed-books', UserBorrowedBooksRouter);

export default apiRouter;
