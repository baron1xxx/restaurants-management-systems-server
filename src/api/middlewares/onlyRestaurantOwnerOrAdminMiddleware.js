import * as tableService from '../services/tableService';
import * as menuService from '../services/menuService';
import * as dishService from '../services/dishService';
import * as restaurantService from '../services/restaurantService';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';
import { FORBIDDEN } from '../../constants/responseStatusCodes';
import { authErrorMessages } from '../../constants/customErrorMessage/authErrorMessage';
import { roles } from '../../constants/roles';

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  try {
    // TODO Ьоже це все переписати на кожну модель окремо (для table своя первірка, для menu своя і т.д.)
    const {
      params: { tableId, menuId, dishId, id }, // id - it is restaurant id from params. When UPDATE or DELETE
      body: { restaurantId }, // When CREATE OR UPDATE. Тобто в якому ресторані створюється або оновлюється модель.
      user } = req;
    if (restaurantId || id) {
      // Check if restaurant exists.
      const restaurant = await restaurantService.getRestaurantById(restaurantId || id);
      return restaurant.userId === user.id || user.role.role === roles.ADMIN
        ? next()
        : next(new ErrorHandler(
          FORBIDDEN,
          authErrorMessages.FORBIDDEN,
          'Only OWNER or ADMIN middleware'
        ));
    }

    if (tableId) {
      // Check if table exists.
      const table = await tableService.getById(tableId);
      // Check if authentication user is owner restaurant.
      req.restaurantId = table.restaurantId;
      return table.restaurant.userId === user.id || user.role.role === roles.ADMIN
        ? next()
        : next(new ErrorHandler(
          FORBIDDEN,
          authErrorMessages.FORBIDDEN,
          'Only OWNER or ADMIN middleware'
        ));
    }

    if (menuId) {
      // Check if menu exists.
      const menu = await menuService.getById(menuId);
      // Check if authentication user is owner restaurant.
      req.restaurantId = menu.restaurant.id;
      return menu.restaurant.userId === user.id || user.role.role === roles.ADMIN
        ? next()
        : next(new ErrorHandler(
          FORBIDDEN,
          authErrorMessages.FORBIDDEN,
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
          FORBIDDEN,
          authErrorMessages.FORBIDDEN,
          'Only OWNER or ADMIN middleware'
        ));
    }
    next();
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller || 'Only oener or admin!!!'));
  }
};
