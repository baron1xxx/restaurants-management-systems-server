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
        message: null
      });
  } catch (e) {
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};

export const google = async (req, res, next) => {
  try {
    const { accessToken } = await userService.google(req.body);
    res.status(200)
      .json({
        error: false,
        data: {
          accessToken
        },
        message: authSuccessMessage.SOCIAL_REGISTRATION_SUCCESSFULLY
      });
  } catch (e) {
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};

export const activate = async (req, res, next) => {
  try {
    const { user } = req;
    const message = await userService.activate(user);
    res.status(200)
      .json({
        error: false,
        data: null,
        message
      });
  } catch (e) {
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};

export const refreshActivate = async (req, res, next) => {
  try {
    const { body: { email } } = req;
    const message = await userService.refreshActivate(email);
    res.status(200)
      .json({
        error: false,
        data: null,
        message
      });
  } catch (e) {
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { user: { id } } = req;
    const user = await userService.getUserById(id);
    res.status(200)
      .json({
        error: false,
        data: user,
        message: null
      });
  } catch (e) {
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};

