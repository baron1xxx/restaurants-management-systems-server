import userRepository from '../../data/repositories/userRepository';
import roleRepository from '../../data/repositories/roleRepository';
import credentialRepository from '../../data/repositories/credentialRepository';
import authTokenRepository from '../../data/repositories/authTokenRepository';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';
import { encrypt, compare } from '../../helpers/cryptoHelper';
import { createToken } from '../../helpers/tokenHelper';
import { emailTransporter } from '../../helpers/emailTransporter';
import { authErrorMessages } from '../../constants/customErrorMessage/authErrorMessage';
import { UNAUTHORIZED } from '../../constants/responseStatusCodes';
import { REGISTER_CONTROLLER, LOGIN_CONTROLLER } from '../../constants/controllerName/authControllerName';
import { ACTIVATE_ACCOUNT } from '../../constants/emailSubject';
import { ownerSecret } from '../../config/jwtConfig';
import { activateAccountTemplate } from '../../template/emailTemplate';

export const register = async ({ email, password, authMethod, role, ...userData }) => {
  try {
    const credentialByEmail = await credentialRepository.getByEmail(email);
    if (credentialByEmail) throw new ErrorHandler(UNAUTHORIZED, authErrorMessages.USER_EXITS, REGISTER_CONTROLLER);

    const { id: roleId } = await roleRepository.getByName(role);

    const user = await userRepository.create({ ...userData, roleId });
    if (!user) throw new ErrorHandler(UNAUTHORIZED, authErrorMessages.USER_NOT_CREATE, REGISTER_CONTROLLER);

    await credentialRepository.create({
      authMethod,
      email,
      password: await encrypt(password),
      userId: user.id
    });

    emailTransporter(
      email,
      ACTIVATE_ACCOUNT,
      activateAccountTemplate(createToken({ userId: user.id }, ownerSecret.activateToken, '5m'))
    );

    return user;
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.controller);
  }
};

export const login = async ({ email, password, authMethod }) => {
  try {
    const credentialByEmail = await credentialRepository.getByEmail(email);
    const { user } = credentialByEmail;
    if (!credentialByEmail) {
      throw new ErrorHandler(
        UNAUTHORIZED,
        authErrorMessages.USER_NOT_FOUND,
        LOGIN_CONTROLLER
      );
    }

    if (credentialByEmail.authMethod !== authMethod) {
      throw new ErrorHandler(
        UNAUTHORIZED,
        authErrorMessages.SIGN_IN_WITH + credentialByEmail.authMethod,
        LOGIN_CONTROLLER
      );
    }
    if (!await compare(password, credentialByEmail.password)) {
      throw new ErrorHandler(
        UNAUTHORIZED,
        authErrorMessages.PASSWORDS_NOT_MATCH,
        LOGIN_CONTROLLER
      );
    }
    if (!user.isActivated) {
      throw new ErrorHandler(
        UNAUTHORIZED,
        authErrorMessages.USER_NOT_ACTIVATED,
        LOGIN_CONTROLLER
      );
    }
    if (user.isBlocked) {
      throw new ErrorHandler(
        UNAUTHORIZED,
        authErrorMessages.USER_BLOCKED,
        LOGIN_CONTROLLER
      );
    }

    const accessToken = createToken({}, ownerSecret.accessToken, '15m');
    const refreshToken = createToken({}, ownerSecret.refreshToken, '1d');

    await authTokenRepository.create({ accessToken, refreshToken, userId: user.id });

    return {
      accessToken: `Bearer ${accessToken}`,
      refreshToken };
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.controller);
  }
};

