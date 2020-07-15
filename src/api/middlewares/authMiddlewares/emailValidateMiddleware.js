import { emailValidator } from '../../../validators/emailValidator';
import { UNAUTHORIZED } from '../../../constants/responseStatusCodes';

export default (req, res, next) => {
  try {
    const { error } = emailValidator.validate(req.body);
    if (error) {
      next({
        status: UNAUTHORIZED,
        message: error.details[0].message,
        controller: 'emailValidateMiddleware' });
    }
    next();
  } catch (e) {
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};
