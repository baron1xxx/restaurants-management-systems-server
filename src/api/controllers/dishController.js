import * as dishService from '../services/dishService';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';

export const create = async (req, res, next) => {
  try {
    const { body, file } = req;

    const dish = await dishService.create({ ...body, file });

    res.status(200)
      .json({
        error: false,
        data: dish
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const getById = async (req, res, next) => {
  try {
    const { params: { id } } = req;

    const dish = await dishService.getById(id);

    res.status(200)
      .json({
        error: false,
        data: dish
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const getDishes = async (req, res, next) => {
  try {
    const { query, pagination, params: { menuId } } = req;

    const dishes = await dishService.getDishes({ ...query, ...pagination, menuId });

    res.status(200)
      .json({
        error: false,
        data: dishes
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const updateDish = async (req, res, next) => {
  try {
    const {
      body,
      file,
      user,
      params: { id }
    } = req;

    const dishUpdated = await dishService.update(id, { ...body, file, user });

    res.status(200)
      .json({
        error: false,
        data: dishUpdated
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const removeDish = async (req, res, next) => {
  try {
    const { params: { id }, user } = req;

    const dishDeleted = await dishService.update(id, { user, isDeleted: true });

    res.status(200)
      .json({
        error: false,
        data: dishDeleted
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
