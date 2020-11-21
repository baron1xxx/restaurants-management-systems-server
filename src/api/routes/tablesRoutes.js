import { Router } from 'express';
import * as tableController from '../controllers/tableController';
import jwtAccessTokenMiddleware from '../middlewares/authMiddlewares/jwtAccessTokenMiddleware';
import roleAuthorizationMiddleware from '../middlewares/authMiddlewares/roleAuthorizationMiddleware';
import onlyRestaurantOwnerOrAdminMiddleware from '../middlewares/onlyRestaurantOwnerOrAdminMiddleware';
import createTableValidMiddleware from '../middlewares/tableMiddlewares/createTableValidMiddleware';
import updateTableValidMiddleware from '../middlewares/tableMiddlewares/updateTableValidMiddleware';
import tableExistsByNumberByRestaurantIdMiddleware
  from '../middlewares/tableMiddlewares/tableExistsByNumberByRestaurantIdMiddleware';
import paginationValidateMiddleware from '../middlewares/paginationValidateMiddleware';
import { roles } from '../../constants/roles';

const router = Router();

router
  .get('/byRestaurant/:restaurantId',
    paginationValidateMiddleware,
    tableController.getTables)
  .post('/',
    jwtAccessTokenMiddleware,
    roleAuthorizationMiddleware([roles.ADMIN, roles.OWNER]),
    createTableValidMiddleware,
    onlyRestaurantOwnerOrAdminMiddleware,
    tableExistsByNumberByRestaurantIdMiddleware,
    tableController.create)
  .route('/:tableId')
  .get(
    jwtAccessTokenMiddleware,
    tableController.getById
  )
  .all(
    jwtAccessTokenMiddleware,
    roleAuthorizationMiddleware([roles.ADMIN, roles.OWNER]),
    onlyRestaurantOwnerOrAdminMiddleware
  )
  .put(
    updateTableValidMiddleware,
    tableExistsByNumberByRestaurantIdMiddleware,
    tableController.updateTable
  )
  .delete(
    tableController.removeTable
  );

export default router;
