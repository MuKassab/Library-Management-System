import { Router } from 'express';

import { validate } from '../../common/middlewares/validation.js';
import { UsersValidation } from '../validation/index.js';
import { UsersController } from '../controller/index.js';

const router = Router();

router.post(
  '/register',
  validate(UsersValidation.registerUser),
  UsersController.registerUser,
);

export default router;
