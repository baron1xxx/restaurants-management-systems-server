import credentialRepository from '../../../data/repositories/credentialRepository';
import { authErrorMessages } from '../../../constants/customErrorMessage/authErrorMessage';

export default async (req, res, next) => {
  try {
    const { body: { email } } = req;
    const credential = await credentialRepository.getByEmail(email);
    if (!credential) {
      next({ status: 401, message: authErrorMessages.USER_EXITS, controller: 'checkEmailMiddleware' });
    }
    const { user } = credential;
    req.user = user;
    next();
  } catch (e) {
    next({ status: 400, message: e.message });
  }
};
