import { Router } from 'express';
import jwtAccessTokenMiddleware from '../middlewares/authMiddlewares/jwtAccessTokenMiddleware';
import checkAddressMiddleware from '../middlewares/addressMiddlewares/checkAddressMiddleware';
import restaurantValidateMiddleware from '../middlewares/restaurantMiddlewares/restaurantValidateMiddleware';
import * as restaurantController from '../controllers/restaurantController';

const router = Router();

router
  .post('/',
    jwtAccessTokenMiddleware,
    checkAddressMiddleware,
    restaurantValidateMiddleware, restaurantController.create);

export default router;
