import * as tableService from '../services/tableService';
import * as menuService from '../services/menuService';
import * as dishService from '../services/dishService';
import * as restaurantService from '../services/restaurantService';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';
import { UNAUTHORIZED } from '../../constants/responseStatusCodes';
import { authErrorMessages } from '../../constants/customErrorMessage/authErrorMessage';
import { roles } from '../../constants/roles';

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  try {
    const {
      params: { tableId, menuId, dishId, id },
      body: { restaurantId },
      user } = req;

    console.log('******************************');
    console.log('restaurantId - ', restaurantId);
    console.log('id - ', id);
    console.log('menuId - ', menuId);
    console.log('tableId - ', tableId);
    console.log('dishId - ', dishId);
    console.log(user.dataValues);
    console.log('******************************');

    if (tableId) {
      // Check if table exists.
      const table = await tableService.getById(tableId);
      // Check if authentication user is owner restaurant.
      return table.restaurant.userId === user.id || user.role.role === roles.ADMIN
        ? next()
        : next(new ErrorHandler(
          UNAUTHORIZED,
          authErrorMessages.UNAUTHORIZED,
          'Only OWNER or ADMIN middleware'
        ));
    }

    if (menuId) {
      // Check if table exists.
      const menu = await menuService.getById(menuId);
      console.log('/////////////////////');
      console.log(menu);
      console.log('/////////////////////');
      // Check if authentication user is owner restaurant.
      return menu.restaurant.userId === user.id || user.role.role === roles.ADMIN
        ? next()
        : next(new ErrorHandler(
          UNAUTHORIZED,
          authErrorMessages.UNAUTHORIZED,
          'Only OWNER or ADMIN middleware'
        ));
    }

    if (dishId) {
      // Check if table exists.
      const dish = await dishService.getById(dishId);
      // Check if authentication user is owner restaurant.
      return dish.menu.restaurant.userId === user.id || user.role.role === roles.ADMIN
        ? next()
        : next(new ErrorHandler(
          UNAUTHORIZED,
          authErrorMessages.UNAUTHORIZED,
          'Only OWNER or ADMIN middleware'
        ));
    }

    if (id || restaurantId) {
      const restaurant = await restaurantService.getById(id || restaurantId);
      return restaurant.userId === user.id || user.role.role === roles.ADMIN
        ? next()
        : next(new ErrorHandler(
          UNAUTHORIZED,
          authErrorMessages.UNAUTHORIZED,
          'Only OWNER or ADMIN middleware'
        ));
    }
    next();
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
