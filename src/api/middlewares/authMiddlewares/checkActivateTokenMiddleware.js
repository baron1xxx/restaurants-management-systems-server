import userRepository from '../../../data/repositories/userRepository';
import { parseToken } from '../../../helpers/tokenHelper';
import { secret } from '../../../config/jwtConfig';
import { authErrorMessages } from '../../../constants/customErrorMessage/authErrorMessage';
import { UNAUTHORIZED } from '../../../constants/responseStatusCodes';

export default async (req, res, next) => {
  try {
    const { params: { token } } = req;
    const { userId: id } = parseToken(token, secret.activateToken);
    const user = await userRepository.getById(id);
    if (!user) {
      next({
        status: UNAUTHORIZED,
        message: authErrorMessages.USER_NOT_FOUND,
        controller: 'checkActivateTokenMiddleware' });
    }
    req.user = user;
    next();
  } catch (e) {
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};
