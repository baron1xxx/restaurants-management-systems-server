import { Router } from 'express';
import jwtAccessTokenMiddleware from '../middlewares/authMiddlewares/jwtAccessTokenMiddleware';
import onlyRestaurantOwnerOrAdminMiddleware from '../middlewares/onlyRestaurantOwnerOrAdminMiddleware';
import createMenuValidMiddleware from '../middlewares/menuMiddlewares/createMenuValidMiddleware';
import updateMenuValidMiddleware from '../middlewares/menuMiddlewares/updateMenuValidMiddleware';
import paginationValidateMiddleware from '../middlewares/paginationValidateMiddleware';
import menuExistsByNameByRestaurantIdMiddleware
  from '../middlewares/menuMiddlewares/menuExistsByNameByRestaurantIdMiddleware';
import imageMiddleware from '../middlewares/imageMiddlewares/imageMiddleware';
import * as menuController from '../controllers/menuController';
import roleAuthorizationMiddleware from '../middlewares/authMiddlewares/roleAuthorizationMiddleware';
import { roles } from '../../constants/roles';

const router = Router();

router
  .get(
    '/byRestaurant/:restaurantId',
    paginationValidateMiddleware,
    menuController.getMenus
  )
  .post('/',
    jwtAccessTokenMiddleware,
    roleAuthorizationMiddleware([roles.ADMIN, roles.OWNER]),
    imageMiddleware,
    createMenuValidMiddleware,
    onlyRestaurantOwnerOrAdminMiddleware,
    menuExistsByNameByRestaurantIdMiddleware,
    menuController.create)
  .route('/:menuId')
  .get(menuController.getMenuById)
  .all(
    jwtAccessTokenMiddleware,
    roleAuthorizationMiddleware([roles.ADMIN, roles.OWNER]),
    imageMiddleware,
    onlyRestaurantOwnerOrAdminMiddleware
  )
  .put(
    updateMenuValidMiddleware,
    menuExistsByNameByRestaurantIdMiddleware,
    menuController.updateMenu
  )
  .delete(
    menuController.removeMenu
  );

export default router;
