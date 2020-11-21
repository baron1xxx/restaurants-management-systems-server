import { Router } from 'express';
import jwtAccessTokenMiddleware from '../middlewares/authMiddlewares/jwtAccessTokenMiddleware';
import roleAuthorizationMiddleware from '../middlewares/authMiddlewares/roleAuthorizationMiddleware';
import onlyRestaurantOwnerOrAdminMiddleware from '../middlewares/onlyRestaurantOwnerOrAdminMiddleware';
import createDishValidMiddleware from '../middlewares/dishMiddlewares/createDishValidMiddleware';
import updateDishValidMiddleware from '../middlewares/dishMiddlewares/updateDishValidMiddleware';
import dishExistsByNameByMenuIdMiddleware from '../middlewares/dishMiddlewares/dishExistsByNameByMenuIdMiddleware';
import imageMiddleware from '../middlewares/imageMiddlewares/imageMiddleware';
import paginationValidateMiddleware from '../middlewares/paginationValidateMiddleware';
import * as dishController from '../controllers/dishController';
import { roles } from '../../constants/roles';

const router = Router();

router
  .get('/byMenu/:menuId',
    paginationValidateMiddleware,
    dishController.getDishes)
  .post('/',
    jwtAccessTokenMiddleware,
    roleAuthorizationMiddleware([roles.OWNER, roles.ADMIN]),
    imageMiddleware,
    createDishValidMiddleware,
    onlyRestaurantOwnerOrAdminMiddleware,
    dishExistsByNameByMenuIdMiddleware,
    dishController.create)
  .route('/:dishId')
  .get(dishController.getById)
  .all(
    jwtAccessTokenMiddleware,
    roleAuthorizationMiddleware([roles.OWNER, roles.ADMIN]),
    onlyRestaurantOwnerOrAdminMiddleware
  )
  .put(
    imageMiddleware,
    updateDishValidMiddleware,
    dishExistsByNameByMenuIdMiddleware,
    dishController.updateDish
  )
  .delete(
    dishController.removeDish
  );

export default router;
