import { changePasswordValidator } from '../../../validators/changePasswordValidator';
import { UNAUTHORIZED } from '../../../constants/responseStatusCodes';

export default (req, res, next) => {
  try {
    const { error } = changePasswordValidator.validate(req.body);
    if (error) {
      next({
        status: UNAUTHORIZED,
        message: error.details[0].message,
        controller: 'changePasswordValidator' });
    }
    next();
  } catch (e) {
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};
