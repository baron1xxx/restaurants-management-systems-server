import { loginValidator } from '../../../validators/loginValidator';
import { UNAUTHORIZED } from '../../../constants/responseStatusCodes';

export default (req, res, next) => {
  try {
    const { error } = loginValidator.validate(req.body);
    if (error) {
      next({
        status: UNAUTHORIZED,
        message: error.details[0].message,
        controller: 'loginValidateMiddleware' });
    }
    next();
  } catch (e) {
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};
