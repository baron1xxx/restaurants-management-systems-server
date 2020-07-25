import jwt from 'jsonwebtoken';
import { ErrorHandler } from './error/ErrorHandler';
import { UNAUTHORIZED } from '../constants/responseStatusCodes';

export const createToken = (data, secret, expiresIn) => jwt.sign(data, secret, { expiresIn });

export const parseToken = (token, secret) => jwt.verify(token, secret, (err, decode) => {
  if (err) throw new ErrorHandler(UNAUTHORIZED, 'Token is invalid.', 'Parse token');
  return decode;
});

export const extractAuthJwtToken = req => {
  const [accessToken] = req.get('Authorization').split(' ').reverse();
  return accessToken;
};
