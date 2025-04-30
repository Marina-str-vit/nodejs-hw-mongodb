import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { registerUserSchema, authLoginSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';

const router = Router();
router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(authLoginSchema),
  // ctrlWrapper(loginController),
);
export default router;
