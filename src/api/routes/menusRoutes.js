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
  .get('/:id', menuController.getMenuById)
  .get('/byRestaurant/:restaurantId',
    paginationValidateMiddleware,
    menuController.getMenus)
  .post('/',
    jwtAccessTokenMiddleware,
    imageMiddleware,
    roleAuthorizationMiddleware([roles.ADMIN, roles.OWNER]),
    onlyRestaurantOwnerOrAdminMiddleware,
    createMenuValidMiddleware,
    menuExistsByNameByRestaurantIdMiddleware,
    menuController.create)
  .put('/:menuId',
    jwtAccessTokenMiddleware,
    imageMiddleware,
    roleAuthorizationMiddleware([roles.ADMIN, roles.OWNER]),
    onlyRestaurantOwnerOrAdminMiddleware,
    updateMenuValidMiddleware,
    menuExistsByNameByRestaurantIdMiddleware,
    menuController.updateMenu)
  .delete('/:menuId',
    jwtAccessTokenMiddleware,
    roleAuthorizationMiddleware([roles.ADMIN, roles.OWNER]),
    onlyRestaurantOwnerOrAdminMiddleware,
    menuController.removeMenu);

export default router;
