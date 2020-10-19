import { Router } from 'express';
import jwtAccessTokenMiddleware from '../middlewares/authMiddlewares/jwtAccessTokenMiddleware';
import createDishValidMiddleware from '../middlewares/dishMiddlewares/createDishValidMiddleware';
import imageMiddleware from '../middlewares/imageMiddlewares/imageMiddleware';
import * as dishController from '../controllers/dishController';

const router = Router();

router
  .post('/',
    jwtAccessTokenMiddleware,
    imageMiddleware,
    createDishValidMiddleware,
    dishController.create);

export default router;
