import * as restaurantService from './restaurantService';
import commentRepository from '../../data/repositories/commentRepository';
import ratingRepository from '../../data/repositories/ratingRepository';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';
import { BEAD_REQUEST, NOT_FOUND } from '../../constants/responseStatusCodes';
import { commentErrorMessages } from '../../constants/customErrorMessage/commentErrorMessage';
import { LIMIT, PAGE } from '../../constants/paginationConstants';
import { countPages, offset } from '../../helpers/paginationHelper';

export const getCommentById = async commentId => {
  try {
    const comment = await commentRepository.getById(commentId);
    if (!comment) {
      throw new ErrorHandler(
        NOT_FOUND,
        commentErrorMessages.COMMENT_NOT_FOUND,
        'Comment service getCommentById() if comment not exists'
      );
    }
    return comment;
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.controller || 'Comment service getCommentById()');
  }
};

export const getCommentsByRestaurantId = async filter => {
  try {
    const { limit = LIMIT, page = PAGE, restaurantId } = filter;
    // Check if restaurant exist
    await restaurantService.getRestaurantById(restaurantId);
    // Count menus by restaurant id
    const commentCount = await commentRepository.countAll(filter);

    return commentCount
      ? {
        comments: await commentRepository.getAll({
          ...filter,
          limit,
          offset: offset(page, limit)
        }),
        totalPage: countPages(commentCount, limit, page)
      }
      : [];
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.controller || 'Comment service getCommentsByRestaurantId()');
  }
};

export const create = async (userId, comment) => {
  try {
    const { rating, restaurantId, ...commentBody } = comment;
    const [ratingObj, created] = await ratingRepository.findOrCreate({ restaurantId }, { rating });

    if (!created) {
      throw new ErrorHandler(
        BEAD_REQUEST,
        commentErrorMessages.ALREADY_REVIEWED,
        'Comment service create() if comment exists'
      );
    }

    return await commentRepository.create(
      {
        ...commentBody,
        restaurantId,
        userId,
        ratingId: ratingObj.id
      }
    );
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.controller || 'Comment service create()');
  }
};

export const updateComment = async (commentId, comment) => {
  try {
    const { rating, ...commentBody } = comment;
    const { ratingId } = await getCommentById(commentId);
    await ratingRepository.updateById(ratingId, { rating });
    await commentRepository.updateById(commentId, commentBody);
    return commentRepository.getById(commentId);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.controller || 'Comment service updateComment()');
  }
};

export const removeComment = async commentId => {
  try {
    await getCommentById(commentId);
    await commentRepository.updateById(commentId, { isDeleted: true });
    return commentRepository.getById(commentId);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.controller || 'Comment service removeComment()');
  }
};
