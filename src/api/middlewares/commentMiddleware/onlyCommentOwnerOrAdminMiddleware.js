import * as commentService from '../../services/commentService';
import { roles } from '../../../constants/roles';
import { ErrorHandler } from '../../../helpers/error/ErrorHandler';
import { FORBIDDEN } from '../../../constants/responseStatusCodes';
import { authErrorMessages } from '../../../constants/customErrorMessage/authErrorMessage';

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  try {
    const { params: { commentId }, user } = req;
    // Check if table exists.
    const comment = await commentService.getCommentById(commentId);
    // Check if authentication user is owner restaurant.
    return comment.userId === user.id || user.role.role === roles.ADMIN
      ? next()
      : next(new ErrorHandler(
        FORBIDDEN,
        authErrorMessages.FORBIDDEN,
        'Only COMMENT OWNER or ADMIN middleware'
      ));
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
