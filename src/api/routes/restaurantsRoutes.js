import { Router } from 'express';
import jwtAccessTokenMiddleware from '../middlewares/authMiddlewares/jwtAccessTokenMiddleware';
import checkAddressMiddleware from '../middlewares/addressMiddlewares/checkAddressMiddleware';
import restaurantValidateMiddleware from '../middlewares/restaurantMiddlewares/restaurantValidateMiddleware';
import openingValidateMiddleware from '../middlewares/restaurantMiddlewares/openingValidateMiddleware';
import * as restaurantController from '../controllers/restaurantController';

const router = Router();

router
  .post('/',
    jwtAccessTokenMiddleware,
    checkAddressMiddleware,
    restaurantValidateMiddleware,
    openingValidateMiddleware,
    restaurantController.create);

export default router;
