import { loginValidator } from '../../../validators/loginValidator';

export default (req, res, next) => {
  try {
    const { error } = loginValidator.validate(req.body);
    if (error) next({ status: 400, message: error.details[0].message });
    next();
  } catch (e) {
    next({ status: e.status, message: e.message });
  }
};
