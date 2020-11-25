import { Router } from 'express';
import * as commentController from '../controllers/commentController';
import createCommentValidMiddleware from '../middlewares/commentMiddleware/createCommentValidMiddleware';
import updateCommentValidMiddleware from '../middlewares/commentMiddleware/updateCommentValidMiddleware';
import jwtAccessTokenMiddleware from '../middlewares/authMiddlewares/jwtAccessTokenMiddleware';
import roleAuthorizationMiddleware from '../middlewares/authMiddlewares/roleAuthorizationMiddleware';
import onlyCommentOwnerOrAdminMiddleware from '../middlewares/commentMiddleware/onlyCommentOwnerOrAdminMiddleware';
import { roles } from '../../constants/roles';
import paginationValidateMiddleware from '../middlewares/paginationValidateMiddleware';

const router = Router();

router
  .get(
    '/byRestaurant/:restaurantId',
    paginationValidateMiddleware,
    commentController.getCommentsByRestaurantId
  )
  .post(
    '/',
    jwtAccessTokenMiddleware,
    roleAuthorizationMiddleware(roles.CUSTOMER),
    createCommentValidMiddleware,
    commentController.createComment
  )
  .route('/:commentId')
  .all(
    jwtAccessTokenMiddleware,
    roleAuthorizationMiddleware(roles.CUSTOMER, roles.ADMIN)
  )
  .get(
    commentController.getCommentBytId
  )
  .put(
    onlyCommentOwnerOrAdminMiddleware,
    updateCommentValidMiddleware,
    commentController.updateComment
  )
  .delete(
    onlyCommentOwnerOrAdminMiddleware,
    commentController.removeComment
  );
export default router;
