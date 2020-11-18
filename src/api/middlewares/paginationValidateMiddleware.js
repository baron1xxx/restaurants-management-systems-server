import { paginationValidator } from '../../validators/paginationValidator';
import { BEAD_REQUEST } from '../../constants/responseStatusCodes';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';

// eslint-disable-next-line consistent-return
export default (req, res, next) => {
  try {
    const { limit, page } = req.query;
    const { error, value } = paginationValidator.validate({ limit, page });
    if (error) {
      return next(new ErrorHandler(
        BEAD_REQUEST,
        error.details[0].message,
        'paginationValidateMiddleware'
      ));
    }

    // TODO Чи потрібно в req обєкт пагінації, може тільки валідувати???!!!
    req.pagination = value;
    next();
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
