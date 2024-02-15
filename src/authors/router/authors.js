import { Router } from 'express';

import { validate } from '../../common/middlewares/validation.js';
import { AuthorsValidation } from '../validation/index.js';
import { AuthorsController } from '../controller/index.js';

const router = Router();

router.post(
  '/',
  validate(AuthorsValidation.addAuthor),
  AuthorsController.addAuthor,
);

router.patch(
  '/:id',
  validate(AuthorsValidation.updateAuthor),
  AuthorsController.updateAuthor,
);

router.delete(
  '/:id',
  validate(AuthorsValidation.deleteAuthor),
  AuthorsController.deleteAuthor,
);

router.get(
  '/',
  validate(AuthorsValidation.listAuthors),
  AuthorsController.listAuthors,
);

export default router;
