import { parseToken } from '../../../helpers/tokenHelper';
import { secret } from '../../../config/jwtConfig';
import { authErrorMessages } from '../../../constants/customErrorMessage/authErrorMessage';
import { FORBIDDEN } from '../../../constants/responseStatusCodes';
import authTokenRepository from '../../../data/repositories/authTokenRepository';

export default async (req, res, next) => {
  try {
    const bearerAccessToken = req.get('Authorization');

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
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};
