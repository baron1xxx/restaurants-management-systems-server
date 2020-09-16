import { ErrorHandler } from '../../../helpers/error/ErrorHandler';
import { openingCreateValidator } from '../../../validators/openingValidator';
import { BEAD_REQUEST } from '../../../constants/responseStatusCodes';

// eslint-disable-next-line consistent-return
export default (req, res, next) => {
  try {
    const { body: { opening } } = req;
    console.log(opening);
    const { error, value: restaurant } = openingCreateValidator.validate(opening);
    if (error) {
      console.log('---------------------------------------------');
      console.log(error);
      console.log(error.details[0].path);
      console.log(error.details[0].context);
      console.log('---------------------------------------------');
    }

    if (error) {
      return next(
        new ErrorHandler(
          BEAD_REQUEST,
          error.details[0].message,
          'restaurantValidateMiddleware'
        )
      );
    }
    req.restaurant = restaurant;
    next();
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
