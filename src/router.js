import { Router } from 'express';

import UsersRouter from './users/router/index.js';

const apiRouter = Router();

apiRouter.use('/users', UsersRouter);

export default apiRouter;
