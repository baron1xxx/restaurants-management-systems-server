import * as userService from '../services/authService';
import { authSuccessMessage } from '../../constants/customSuccessMessage/authSuccessMessage';

export const register = async (req, res, next) => {
  try {
    const user = await userService.register(req.user);
    res.status(200)
      .json({
        error: false,
        data: user,
        message: authSuccessMessage.REGISTRATION_SUCCESSFULLY
      });
  } catch (e) {
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};

export const login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await userService.login(req.body);
    res.status(200)
      .json({
        error: false,
        data: {
          accessToken,
          refreshToken
        },
        message: ''
      });
  } catch (e) {
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};
