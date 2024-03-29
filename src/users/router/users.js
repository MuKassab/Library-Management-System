import { Router } from 'express';

import { apiRateLimiter, validate } from '../../common/middlewares/index.js';
import { UsersValidation } from '../validation/index.js';
import { UsersController } from '../controller/index.js';

const router = Router();

router.post(
  '/register',
  validate(UsersValidation.registerUser),
  UsersController.registerUser,
);

router.post(
  '/login',
  apiRateLimiter,
  validate(UsersValidation.authenticateUser),
  UsersController.authenticateUser,
);

router.patch(
  '/:id',
  validate(UsersValidation.updateUser),
  UsersController.updateUser,
);

router.delete(
  '/:id',
  validate(UsersValidation.deleteUser),
  UsersController.deleteUser,
);

router.get(
  '/:id',
  validate(UsersValidation.getUser),
  UsersController.getUser,
);

router.get(
  '/',
  validate(UsersValidation.listUsers),
  UsersController.listUsers,
);

export default router;
