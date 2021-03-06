import { userCreateValidator } from '../../../validators/userValidator';
import { UNAUTHORIZED } from '../../../constants/responseStatusCodes';

export default (req, res, next) => {
  try {
    const { error, value: user } = userCreateValidator.validate(req.body);
    if (error) {
      next({
        status: UNAUTHORIZED,
        message: error.details[0].message,
        controller: 'userValidateMiddleware' });
    }
    req.user = user;
    next();
  } catch (e) {
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};
