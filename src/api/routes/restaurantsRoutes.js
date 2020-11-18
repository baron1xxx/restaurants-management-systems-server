import { Router } from 'express';
import * as restaurantController from '../controllers/restaurantController';
import roleAuthorizationMiddleware from '../middlewares/authMiddlewares/roleAuthorizationMiddleware';
import checkAddressMiddleware from '../middlewares/addressMiddlewares/checkAddressMiddleware';
import restaurantValidateMiddleware from '../middlewares/restaurantMiddlewares/restaurantValidateMiddleware';
import updateRestaurantValidMiddleware from '../middlewares/restaurantMiddlewares/updateRestaurantValidMiddleware';
import openingValidateMiddleware from '../middlewares/restaurantMiddlewares/openingValidateMiddleware';
import checkRestaurantExistsMiddleware from '../middlewares/restaurantMiddlewares/checkRestaurantExistsMiddleware';
import onlyRestaurantOwnerOrAdminMiddleware from '../middlewares/onlyRestaurantOwnerOrAdminMiddleware';
import paginationValidateMiddleware from '../middlewares/paginationValidateMiddleware';
import imageMiddleware from '../middlewares/imageMiddlewares/imageMiddleware';
import jwtAccessTokenMiddleware from '../middlewares/authMiddlewares/jwtAccessTokenMiddleware';
import { roles } from '../../constants/roles';

const router = Router();

router
  .get('/',
    paginationValidateMiddleware,
    restaurantController.getRestaurants)
  .get('/byUserId',
    jwtAccessTokenMiddleware,
    paginationValidateMiddleware,
    restaurantController.getRestaurantsByUserId)
  .post('/',
    jwtAccessTokenMiddleware,
    roleAuthorizationMiddleware([roles.OWNER, roles.ADMIN]),
    imageMiddleware,
    restaurantValidateMiddleware,
    openingValidateMiddleware,
    checkAddressMiddleware,
    checkRestaurantExistsMiddleware,
    restaurantController.create)
  .route('/:id')
  .get(restaurantController.getById)
  .all(
    jwtAccessTokenMiddleware,
    roleAuthorizationMiddleware([roles.OWNER, roles.ADMIN]),
    onlyRestaurantOwnerOrAdminMiddleware
  )
  .put(
    imageMiddleware,
    updateRestaurantValidMiddleware,
    // TODO Rename checkRestaurantNameExistsMiddleware!!!
    checkRestaurantExistsMiddleware,
    restaurantController.updateRestaurant
  )
  .delete(
    restaurantController.removeRestaurant
  );
// .put('/:id',
//   // jwtAccessTokenMiddleware,
//   roleAuthorizationMiddleware([roles.OWNER, roles.ADMIN]),
//   imageMiddleware,
//   onlyRestaurantOwnerOrAdminMiddleware,
//   checkRestaurantExistsMiddleware,
//   restaurantController.updateRestaurant)
// .delete('/:id',
//   // jwtAccessTokenMiddleware,
//   roleAuthorizationMiddleware([roles.OWNER, roles.ADMIN]),
//   onlyRestaurantOwnerOrAdminMiddleware,
//   restaurantController.removeRestaurant);
//
// router
//   .route('/:id')
//   .all(jwtAccessTokenMiddleware)
//   .put(
//     roleAuthorizationMiddleware([roles.OWNER, roles.ADMIN]),
//     imageMiddleware,
//     onlyRestaurantOwnerOrAdminMiddleware,
//     checkRestaurantExistsMiddleware,
//     restaurantController.updateRestaurant
//   )
//   .delete(
//     roleAuthorizationMiddleware([roles.OWNER, roles.ADMIN]),
//     onlyRestaurantOwnerOrAdminMiddleware,
//     restaurantController.removeRestaurant
//   );

export default router;
