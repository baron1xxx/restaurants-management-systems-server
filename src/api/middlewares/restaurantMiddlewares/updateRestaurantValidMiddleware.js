import { ErrorHandler } from '../../../helpers/error/ErrorHandler';
import { restaurantUpdateValidator } from '../../../validators/restaurantValidator';
import { BEAD_REQUEST } from '../../../constants/responseStatusCodes';

// eslint-disable-next-line consistent-return
export default (req, res, next) => {
  try {
    const {
      body: {
        name,
        description,
        telephone } } = req;

    const {
      error,
      value: restaurant } = restaurantUpdateValidator.validate({ name, description, telephone });
    if (error) {
      return next(
        new ErrorHandler(
          BEAD_REQUEST,
          error.details[0].message,
          'updateRestaurantValidMiddleware'
        )
      );
    }
    req.restaurant = restaurant;
    next();
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
