import { ErrorHandler } from '../../../helpers/error/ErrorHandler';
import { menuCreateValidator } from '../../../validators/menuValidator';
import { BEAD_REQUEST } from '../../../constants/responseStatusCodes';

// eslint-disable-next-line consistent-return
export default (req, res, next) => {
  try {
    const { body: { name, restaurantId } } = req;

    const { error } = menuCreateValidator.validate({ name, restaurantId });
    if (error) {
      return next(
        new ErrorHandler(
          BEAD_REQUEST,
          error.details[0].message,
          'createMenuValidMiddleware'
        )
      );
    }
    next();
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
