import { Router } from 'express';
import jwtAccessTokenMiddleware from '../middlewares/authMiddlewares/jwtAccessTokenMiddleware';
import checkAddressMiddleware from '../middlewares/addressMiddlewares/checkAddressMiddleware';
import restaurantValidateMiddleware from '../middlewares/restaurantMiddlewares/restaurantValidateMiddleware';
import openingValidateMiddleware from '../middlewares/restaurantMiddlewares/openingValidateMiddleware';
import checkRestaurantExistsMiddleware from '../middlewares/restaurantMiddlewares/checkRestaurantExistsMiddleware';
import paginationValidateMiddleware from '../middlewares/paginationValidateMiddleware';
import imageMiddleware from '../middlewares/imageMiddlewares/imageMiddleware';
import * as restaurantController from '../controllers/restaurantController';

const router = Router();

router
  .get('/',
    paginationValidateMiddleware,
    restaurantController.getRestaurants)
  .get('/byUserId',
    jwtAccessTokenMiddleware,
    paginationValidateMiddleware,
    restaurantController.getRestaurantsByUserId)
  .get('/:id', restaurantController.getById)
  .post('/',
    jwtAccessTokenMiddleware,
    imageMiddleware,
    restaurantValidateMiddleware,
    openingValidateMiddleware,
    checkAddressMiddleware,
    checkRestaurantExistsMiddleware,
    restaurantController.create)
  .put('/:id',
    jwtAccessTokenMiddleware,
    imageMiddleware,
    restaurantController.updateRestaurant)
  .delete('/:id',
    jwtAccessTokenMiddleware,
    restaurantController.removeRestaurant);

export default router;
