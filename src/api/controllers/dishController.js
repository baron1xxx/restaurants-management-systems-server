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
