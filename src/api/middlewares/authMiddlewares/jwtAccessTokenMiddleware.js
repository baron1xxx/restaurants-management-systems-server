import { parseToken } from '../../../helpers/tokenHelper';
import { secret } from '../../../config/jwtConfig';
import { authErrorMessages } from '../../../constants/customErrorMessage/authErrorMessage';
import { FORBIDDEN } from '../../../constants/responseStatusCodes';
import authTokenRepository from '../../../data/repositories/authTokenRepository';

export default async (req, res, next) => {
  try {
    // TODO use extractAuthJwtToken from tokenHelper
    const bearerAccessToken = req.get('Authorization');
    // TODO change Error exception (return next new ErrorHandler ())
    if (!bearerAccessToken) {
      next({
        status: FORBIDDEN,
        message: authErrorMessages.NO_ACCESS_TOKEN,
        controller: 'jwtTokenMiddleware' });
    }

    const [accessToken] = bearerAccessToken.split(' ').reverse();
    parseToken(accessToken, secret.accessToken);

    const authTokens = await authTokenRepository.getUserByAccessToken(accessToken);

    if (!authTokens) {
      next({
        status: FORBIDDEN,
        message: authErrorMessages.TOKEN_NOT_FOUND_IN_DB,
        controller: 'jwtTokenMiddleware' });
    }
    req.user = authTokens.user;
    next();
  } catch (e) {
    // TODO change Error exception (next new ErrorHandler (e.status, e.message, e.controller))
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};
