import * as restaurantService from '../services/restaurantService';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';

export const create = async (req, res, next) => {
  try {
    const {
      address,
      opening,
      file,
      restaurant: restaurantData,
      user: { id: userId }
    } = req;

    const restaurant = await restaurantService.create(address, restaurantData, opening, file, userId);

    res.status(200)
      .json({
        error: false,
        data: restaurant
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
