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

export const getRestaurants = async (req, res, next) => {
  try {
    const { pagination, query } = req;

    const restaurants = await restaurantService.getRestaurants({ ...query, ...pagination });

    res.status(200)
      .json({
        error: false,
        data: restaurants
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const getRestaurantsByName = async (req, res, next) => {
  try {
    const { pagination, query } = req;

    const restaurants = await restaurantService.getRestaurants({ ...query, ...pagination });

    res.status(200)
      .json({
        error: false,
        data: restaurants
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const getRestaurantsByUserId = async (req, res, next) => {
  try {
    const { pagination, user: { id: userId }, query } = req;

    const restaurants = await restaurantService.getRestaurants({ ...query, ...pagination, userId });

    res.status(200)
      .json({
        error: false,
        data: restaurants
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const getById = async (req, res, next) => {
  try {
    const { params: { id } } = req;

    const restaurant = await restaurantService.getById(id);

    res.status(200)
      .json({
        error: false,
        data: restaurant
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const updateRestaurant = async (req, res, next) => {
  try {
    const { params: { id }, user: { id: userId }, body } = req;

    const restaurantUpdated = await restaurantService.update({ id, userId }, body);

    res.status(200)
      .json({
        error: false,
        data: restaurantUpdated
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const removeRestaurant = async (req, res, next) => {
  try {
    const { params: { id }, user: { id: userId } } = req;

    const restaurantDeleted = await restaurantService.remove({ id, userId });

    res.status(200)
      .json({
        error: false,
        data: restaurantDeleted
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
