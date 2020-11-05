import { ErrorHandler } from '../../../helpers/error/ErrorHandler';
import { updateTableValidator } from '../../../validators/tableValidator';
import { BEAD_REQUEST } from '../../../constants/responseStatusCodes';

// eslint-disable-next-line consistent-return
export default (req, res, next) => {
  try {
    const { body: { number, restaurantId } } = req;

    const { error } = updateTableValidator.validate({ number, restaurantId });
    if (error) {
      return next(
        new ErrorHandler(
          BEAD_REQUEST,
          error.details[0].message,
          'updateTableValidMiddleware'
        )
      );
    }
    next();
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
