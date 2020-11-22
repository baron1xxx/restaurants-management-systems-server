import * as commentService from '../services/commentService';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';

export const getCommentBytId = async (req, res, next) => {
  try {
    const { params: { commentId } } = req;

    const comment = await commentService.getCommentById(commentId);
    res.status(200)
      .json({
        error: false,
        data: comment
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const getCommentsByRestaurantId = async (req, res, next) => {
  try {
    const { query, pagination, params: { restaurantId } } = req;

    const comments = await commentService.getCommentsByRestaurantId({ ...query, ...pagination, restaurantId });
    res.status(200)
      .json({
        error: false,
        data: comments
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const createComment = async (req, res, next) => {
  try {
    const comment = await commentService.create(req.user.id, req.body);
    res.status(201)
      .json({
        error: false,
        data: comment
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { params: { commentId } } = req;
    const comment = await commentService.updateComment(commentId, req.body);
    res.status(201)
      .json({
        error: false,
        data: comment
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};

export const removeComment = async (req, res, next) => {
  try {
    const { params: { commentId } } = req;
    const comment = await commentService.removeComment(commentId);
    res.status(201)
      .json({
        error: false,
        data: comment
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
