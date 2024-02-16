import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerSpecs from '../docs/index.js';

const router = new Router();

router.use('/docs/api', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default router;
