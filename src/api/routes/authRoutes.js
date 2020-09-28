import { Router } from 'express';
import userValidateMiddleware from '../middlewares/userMiddlewares/userValidateMiddleware';
import loginValidateMiddleware from '../middlewares/authMiddlewares/loginValidateMiddleware';
import googleLoginValidateMiddleware from '../middlewares/authMiddlewares/googleLoginValidateMiddleware';
import checkActivateTokenMiddleware from '../middlewares/authMiddlewares/checkActivateTokenMiddleware';
import checkChangePasswordTokenMiddleware from '../middlewares/authMiddlewares/checkChangePasswordTokenMiddleware';
import changePasswordValidateMiddleware from '../middlewares/authMiddlewares/changePasswordValidateMiddleware';
import emailValidateMiddleware from '../middlewares/authMiddlewares/emailValidateMiddleware';
import checkEmailMiddleware from '../middlewares/authMiddlewares/checkEmailMiddleware';
import jwtAccessTokenMiddleware from '../middlewares/authMiddlewares/jwtAccessTokenMiddleware';
import * as authController from '../controllers/authController';

const router = Router();

router
  .get('/activate/:token', checkActivateTokenMiddleware, authController.activate)
  .get('/user', jwtAccessTokenMiddleware, authController.getUserById)
  .get('/logout', authController.logout)
  .post('/activate', emailValidateMiddleware, authController.refreshActivate)
  .post('/register', userValidateMiddleware, authController.register)
  .post('/login', loginValidateMiddleware, authController.login)
  .post('/google', googleLoginValidateMiddleware, authController.google)
  .post('/password/forgot', emailValidateMiddleware, checkEmailMiddleware, authController.forgotPassword)
  .post('/password/change/:token',
    checkChangePasswordTokenMiddleware,
    changePasswordValidateMiddleware,
    authController.changePassword);

// Test passport google authentication

// router
//   .get('/google', registrationGoogleMiddleware)
//   .get('/google/callback', registrationGoogleCallbackMiddleware, (req, res) => {
//     res.json(req.user);
//   });

export default router;
