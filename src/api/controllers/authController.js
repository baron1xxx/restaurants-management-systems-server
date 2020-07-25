import * as authService from '../services/authService';
import { extractAuthJwtToken } from '../../helpers/tokenHelper';
import { authSuccessMessage } from '../../constants/customSuccessMessage/authSuccessMessage';

export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.user);
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
    const { accessToken, refreshToken } = await authService.login(req.body);
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
    const { accessToken } = await authService.google(req.body);
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
    const message = await authService.activate(user);
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
    const message = await authService.refreshActivate(email);
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
    const user = await authService.getUserById(id);
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

export const logout = async (req, res, next) => {
  try {
    const accessToken = extractAuthJwtToken(req);
    await authService.logout(accessToken);
    res.status(204)
      .json({
        error: false,
        data: null,
        message: authSuccessMessage.LOGOUT_SUCCESSFULLY
      });
  } catch (e) {
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};

