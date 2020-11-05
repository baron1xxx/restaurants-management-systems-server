import { Router } from 'express';
import * as tableController from '../controllers/tableController';
import jwtAccessTokenMiddleware from '../middlewares/authMiddlewares/jwtAccessTokenMiddleware';
import roleAuthorizationMiddleware from '../middlewares/authMiddlewares/roleAuthorizationMiddleware';
import onlyOwnerOrAdminMiddleware from '../middlewares/onlyOwnerOrAdminMiddleware';
import createTableValidMiddleware from '../middlewares/tableMiddlewares/createTableValidMiddleware';
import updateTableValidMiddleware from '../middlewares/tableMiddlewares/updateTableValidMiddleware';
import tableExistsByNumberByRestaurantIdMiddleware
  from '../middlewares/tableMiddlewares/tableExistsByNumberByRestaurantIdMiddleware';
import paginationValidateMiddleware from '../middlewares/paginationValidateMiddleware';
import { roles } from '../../constants/roles';

const router = Router();

router
  .get('/:id',
    jwtAccessTokenMiddleware,
    tableController.getById)
  .get('/byRestaurant/:restaurantId',
    paginationValidateMiddleware,
    tableController.getTables)
  .post('/',
    jwtAccessTokenMiddleware,
    roleAuthorizationMiddleware([roles.ADMIN, roles.OWNER]),
    // onlyOwnerOrAdminMiddleware,
    createTableValidMiddleware,
    tableExistsByNumberByRestaurantIdMiddleware,
    tableController.create)
  .put('/:tableId',
    jwtAccessTokenMiddleware,
    roleAuthorizationMiddleware([roles.ADMIN, roles.OWNER]),
    updateTableValidMiddleware,
    onlyOwnerOrAdminMiddleware,
    tableExistsByNumberByRestaurantIdMiddleware,
    tableController.updateTable)
  .delete('/:tableId',
    jwtAccessTokenMiddleware,
    roleAuthorizationMiddleware([roles.ADMIN, roles.OWNER]),
    onlyOwnerOrAdminMiddleware,
    tableController.removeTable);

export default router;
