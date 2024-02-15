import { Router } from 'express';

import AuthorsRouters from './authors.js';

const router = Router();

router.use(AuthorsRouters);

export default router;
