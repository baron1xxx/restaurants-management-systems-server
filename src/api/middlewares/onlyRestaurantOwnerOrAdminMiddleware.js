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
      body: { restaurantId, menuId: idMenu }, // When CREATE. Тобто в якому ресторані або меню створюється модель.
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

    if (idMenu) {
      // Check if menu exists when create dish.
      const menu = await menuService.getById(idMenu);
      // menuId потрібно бо по імені будемо шукати в конткретному меню ( dishExistsByNameByMenuIdMiddleware).
      req.menuId = menu.id;
      // Check if authentication user is owner restaurant.
      return menu.restaurant.userId === user.id || user.role.role === roles.ADMIN
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
      // restaurantId потрібно бо по номеру будемо шукати в конткретному меню (tableExistsByNumberByRest*IdMiddleware).
      req.restaurantId = table.restaurantId;
      // Check if authentication user is owner restaurant.
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
      // restaurantId потрібно бо по імені будемо шукати в конткретному рестор. (menuExistsByNameByRestaurantIdMidd..).
      req.restaurantId = menu.restaurant.id;
      // Check if authentication user is owner restaurant.
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
      req.menuId = dish.menu.id;
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
    next(new ErrorHandler(e.status, e.message, e.controller || 'Only owner or admin!!!'));
  }
};
