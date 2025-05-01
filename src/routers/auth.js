import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import {
  loginController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';

const router = Router();
router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default router;
