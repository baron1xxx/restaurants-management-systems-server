import { Router } from 'express';
import userValidateMiddleware from '../middlewares/userMiddlewares/userValidateMiddleware';
import loginValidateMiddleware from '../middlewares/authMiddlewares/loginValidateMiddleware';
import googleLoginValidateMiddleware from '../middlewares/authMiddlewares/googleLoginValidateMiddleware';
import checkActivateTokenMiddleware from '../middlewares/authMiddlewares/checkActivateTokenMiddleware';
import emailValidateMiddleware from '../middlewares/authMiddlewares/emailValidateMiddleware';
import jwtAccessTokenMiddlewar from '../middlewares/authMiddlewares/jwtAccessTokenMiddlewar';
import * as authController from '../controllers/authController';

const router = Router();

router
  .get('/activate/:token', checkActivateTokenMiddleware, authController.activate)
  .get('/user', jwtAccessTokenMiddlewar, authController.getUserById)
  .post('/activate', emailValidateMiddleware, authController.refreshActivate)
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
