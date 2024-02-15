import { Router } from 'express';

import UsersRouter from './users/router/index.js';
import AuthorsRouter from './authors/router/index.js';

const apiRouter = Router();

apiRouter.use('/users', UsersRouter);
apiRouter.use('/authors', AuthorsRouter);

export default apiRouter;
