import { Router } from 'express';
import userValidateMiddleware from '../middlewares/userMiddlewares/userValidateMiddleware';
import loginValidateMiddleware from '../middlewares/authMiddlewares/loginValidateMiddleware';
import googleLoginValidateMiddleware from '../middlewares/authMiddlewares/googleLoginValidateMiddleware';
import * as authController from '../controllers/authController';

const router = Router();

router
  .post('/register', userValidateMiddleware, authController.register)
  .post('/login', loginValidateMiddleware, authController.login)
  .post('/google', googleLoginValidateMiddleware, authController.google);

// Test passport google authentication

// router
//   .get('/google', registrationGoogleMiddleware)
//   .get('/google/callback', registrationGoogleCallbackMiddleware, (req, res) => {
//     res.json(req.user);
//   });

export default router;
