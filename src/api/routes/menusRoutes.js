import { Router } from 'express';
import jwtAccessTokenMiddleware from '../middlewares/authMiddlewares/jwtAccessTokenMiddleware';
import createMenuValidMiddleware from '../middlewares/menuMiddlewares/createMenuValidMiddleware';
import updateMenuValidMiddleware from '../middlewares/menuMiddlewares/updateMenuValidMiddleware';
import paginationValidateMiddleware from '../middlewares/paginationValidateMiddleware';
import menuExistsByNameByRestaurantIdMiddleware
  from '../middlewares/menuMiddlewares/menuExistsByNameByRestaurantIdMiddleware';
import imageMiddleware from '../middlewares/imageMiddlewares/imageMiddleware';
import * as menuController from '../controllers/menuController';

const router = Router();

router
  .get('/:id', menuController.getMenuById)
  .get('/byRestaurant/:restaurantId',
    paginationValidateMiddleware,
    menuController.getMenus)
  .post('/',
    jwtAccessTokenMiddleware,
    imageMiddleware,
    createMenuValidMiddleware,
    menuExistsByNameByRestaurantIdMiddleware,
    menuController.create)
  .put('/:id',
    jwtAccessTokenMiddleware,
    imageMiddleware,
    updateMenuValidMiddleware,
    menuExistsByNameByRestaurantIdMiddleware,
    menuController.updateMenu)
  .delete('/:id',
    jwtAccessTokenMiddleware,
    menuController.removeMenu);

export default router;
