import { Router } from 'express';

import UsersRouter from './users.js';

const router = Router();

router.use(UsersRouter);

export default router;
