import { ErrorHandler } from '../../../helpers/error/ErrorHandler';
import { openingCreateValidator } from '../../../validators/openingValidator';
import { BEAD_REQUEST } from '../../../constants/responseStatusCodes';

// eslint-disable-next-line consistent-return
export default (req, res, next) => {
  try {
    const { body: { opening } } = req;

    const { error, value: validOpening } = openingCreateValidator.validate(opening);

    if (error) {
      const { path, message } = error.details[0];
      return next(
        new ErrorHandler(
          BEAD_REQUEST,
          `${path[1].toUpperCase()} ${message} (${opening[path[0]].day.toUpperCase()})`,
          'restaurantValidateMiddleware'
        )
      );
    }

    req.opening = validOpening;
    next();
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
