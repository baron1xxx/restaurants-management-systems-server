import { userCreateValidator } from '../../../validators/userValidator';

export default (req, res, next) => {
  try {
    const { error, value: user } = userCreateValidator.validate(req.body);
    if (error) next({ status: 400, message: error.details[0].message });
    req.user = user;
    next();
  } catch (e) {
    next({ status: e.status, message: e.message });
  }
};
