import { Router } from 'express';
import userValidateMiddleware from '../middlewares/userMiddlewares/userValidateMiddleware';
import loginValidateMiddleware from '../middlewares/authMiddlewares/loginValidateMiddleware';
import * as authController from '../controllers/authController';

const router = Router();

router
  .post('/register', userValidateMiddleware, authController.register)
  .post('/login', loginValidateMiddleware, authController.login)
  .post('/google', googleLoginValidateMiddleware, authController.google);

export default router;
