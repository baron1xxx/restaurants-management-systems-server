import { Router } from 'express';
import jwtAccessTokenMiddleware from '../middlewares/authMiddlewares/jwtAccessTokenMiddleware';
import checkAddressMiddleware from '../middlewares/addressMiddlewares/checkAddressMiddleware';
import restaurantValidateMiddleware from '../middlewares/restaurantMiddlewares/restaurantValidateMiddleware';
import openingValidateMiddleware from '../middlewares/restaurantMiddlewares/openingValidateMiddleware';
import chackRestaurantExistsMiddleware from '../middlewares/restaurantMiddlewares/chackRestaurantExistsMiddleware';
import imageMiddleware from '../middlewares/imageMiddlewares/imageMiddleware';
import * as restaurantController from '../controllers/restaurantController';

const router = Router();

router
  .post('/',
    jwtAccessTokenMiddleware,
    imageMiddleware,
    restaurantValidateMiddleware,
    openingValidateMiddleware,
    checkAddressMiddleware,
    chackRestaurantExistsMiddleware,
    restaurantController.create);

export default router;
