import * as menuService from '../services/menuService';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';

export const create = async (req, res, next) => {
  try {
    const { body: { name, restaurantId }, file } = req;

    const menu = await menuService.create({ name, restaurantId, file });

    res.status(200)
      .json({
        error: false,
        data: menu
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const getMenus = async (req, res, next) => {
  try {
    const { query, pagination, params: { restaurantId } } = req;

    const menus = await menuService.getMenus({ ...query, ...pagination, restaurantId });

    res.status(200)
      .json({
        error: false,
        data: menus
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const getMenuById = async (req, res, next) => {
  try {
    const { params: { menuId } } = req;

    const menu = await menuService.getById(menuId);

    res.status(200)
      .json({
        error: false,
        data: menu
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const updateMenu = async (req, res, next) => {
  try {
    const {
      body,
      file,
      params: { menuId }
    } = req;

    const menuUpdated = await menuService.update(menuId, { ...body, file });

    res.status(200)
      .json({
        error: false,
        data: menuUpdated
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const removeMenu = async (req, res, next) => {
  try {
    const { params: { menuId }, user } = req;

    const menuDeleted = await menuService.update(menuId, { user, isDeleted: true });

    res.status(200)
      .json({
        error: false,
        data: menuDeleted
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
