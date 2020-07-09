import { Router } from 'express';
import userValidateMiddleware from '../middlewares/userMiddlewares/userValidateMiddleware';
import * as authController from '../controllers/authController';

const router = Router();

router
  .post('/register', userValidateMiddleware, authController.register);

export default router;
