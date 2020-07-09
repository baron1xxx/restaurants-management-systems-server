import jwt from 'jsonwebtoken';

export const createToken = (data, secret, expiresIn) => jwt.sign(data, secret, { expiresIn });

export const parseToken = (token, secret) => jwt.verify(token, secret, (err, decode) => {
  if (err) throw new Error('Token is invalid.');
  return decode;
});
