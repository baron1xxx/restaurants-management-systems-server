import { ErrorHandler } from '../../../helpers/error/ErrorHandler';
import { UNAUTHORIZED } from '../../../constants/responseStatusCodes';
import { authErrorMessages } from '../../../constants/customErrorMessage/authErrorMessage';

// eslint-disable-next-line consistent-return
export default (roles = []) => (req, res, next) => {
  if (roles.length && !roles.includes(req.user.role.role)) {
    // user's role is not authorized
    return next(new ErrorHandler(
      UNAUTHORIZED,
      authErrorMessages.UNAUTHORIZED,
      'Role authorization middleware'
    ));
  }
  // authentication and authorization successful
  next();
};
