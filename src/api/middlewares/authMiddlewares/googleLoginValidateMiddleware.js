import { googleLoginValidator } from '../../../validators/googleLoginValidator';
import { UNAUTHORIZED } from '../../../constants/responseStatusCodes';

export default (req, res, next) => {
  try {
    const { error } = googleLoginValidator.validate(req.body);
    if (error) {
      next({
        status: UNAUTHORIZED,
        message: error.details[0].message,
        controller: 'googleLoginValidateMiddleware' });
    }
    next();
  } catch (e) {
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};
