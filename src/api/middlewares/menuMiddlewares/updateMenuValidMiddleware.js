import { ErrorHandler } from '../../../helpers/error/ErrorHandler';
import { menuUpdateValidator } from '../../../validators/menuValidator';
import { BEAD_REQUEST } from '../../../constants/responseStatusCodes';

// eslint-disable-next-line consistent-return
export default (req, res, next) => {
  try {
    const { error } = menuUpdateValidator.validate(req.body);
    if (error) {
      return next(
        new ErrorHandler(
          BEAD_REQUEST,
          error.details[0].message,
          'updateMenuValidMiddleware'
        )
      );
    }
    next();
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
