import userRepository from '../../data/repositories/userRepository';
import roleRepository from '../../data/repositories/roleRepository';
import credentialRepository from '../../data/repositories/credentialRepository';
import authTokenRepository from '../../data/repositories/authTokenRepository';
import imageRepository from '../../data/repositories/imageRepository';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';
import { encrypt, compare } from '../../helpers/cryptoHelper';
import { createToken } from '../../helpers/tokenHelper';
import { emailTransporter } from '../../helpers/emailTransporter';
import { authErrorMessages } from '../../constants/customErrorMessage/authErrorMessage';
import { UNAUTHORIZED } from '../../constants/responseStatusCodes';
import {
  REGISTER_SERVICE,
  LOGIN_SERVICE,
  GOOGLE_SERVICE,
  ACTIVATE_SERVICE
} from '../../constants/servicesName/authServicesName';
import { ACTIVATE_ACCOUNT } from '../../constants/emailSubject';
import { secret } from '../../config/jwtConfig';
import { activateAccountTemplate } from '../../template/emailTemplate';
import { authSuccessMessage } from '../../constants/customSuccessMessage/authSuccessMessage';

export const register = async ({ email, password, authMethod, role, ...userData }) => {
  try {
    const credentialByEmail = await credentialRepository.getByEmail(email);
    if (credentialByEmail) throw new ErrorHandler(UNAUTHORIZED, authErrorMessages.USER_EXITS, REGISTER_SERVICE);

    const { id: roleId } = await roleRepository.getByName(role);

    const user = await userRepository.create({ ...userData, roleId });
    if (!user) throw new ErrorHandler(UNAUTHORIZED, authErrorMessages.USER_NOT_CREATE, REGISTER_SERVICE);

    await credentialRepository.create({
      authMethod,
      email,
      password: await encrypt(password),
      userId: user.id
    });

    emailTransporter(
      email,
      ACTIVATE_ACCOUNT,
      activateAccountTemplate(createToken({ userId: user.id }, secret.activateToken, '5m'))
    );

    return user;
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.controller);
  }
};

export const login = async ({ email, password, authMethod }) => {
  try {
    const credentialByEmail = await credentialRepository.getByEmail(email);

    if (!credentialByEmail) {
      throw new ErrorHandler(
        UNAUTHORIZED,
        authErrorMessages.USER_NOT_FOUND,
        LOGIN_SERVICE
      );
    }

    if (credentialByEmail.authMethod !== authMethod) {
      throw new ErrorHandler(
        UNAUTHORIZED,
        authErrorMessages.SIGN_IN_WITH + credentialByEmail.authMethod,
        LOGIN_SERVICE
      );
    }
    if (!await compare(password, credentialByEmail.password)) {
      throw new ErrorHandler(
        UNAUTHORIZED,
        authErrorMessages.PASSWORDS_NOT_MATCH,
        LOGIN_SERVICE
      );
    }

    const { user } = credentialByEmail;
    if (!user.isActivated) {
      throw new ErrorHandler(
        UNAUTHORIZED,
        authErrorMessages.USER_NOT_ACTIVATED,
        LOGIN_SERVICE
      );
    }
    if (user.isBlocked) {
      throw new ErrorHandler(
        UNAUTHORIZED,
        authErrorMessages.USER_BLOCKED,
        LOGIN_SERVICE
      );
    }

    const accessToken = createToken({}, secret.accessToken, '15m');
    const refreshToken = createToken({}, secret.refreshToken, '1d');

    await authTokenRepository.create({ accessToken, refreshToken, userId: user.id });

    return {
      accessToken: `Bearer ${accessToken}`,
      refreshToken };
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.controller);
  }
};

export const google = async ({ email, password, authMethod, imageUrl: link, ...userData }) => {
  try {
    let credential = await credentialRepository.getByEmail(email);

    if (!credential) {
      const { id: imageId } = await imageRepository.create({ link });
      const { id: userId } = await userRepository.create({ imageId, ...userData });
      credential = await credentialRepository.create({
        email,
        authMethod,
        userId,
        password: await encrypt(password),
        isActivated: true
      });
    }

    if (credential.authMethod !== authMethod) {
      throw new ErrorHandler(
        UNAUTHORIZED,
        authErrorMessages.SIGN_IN_WITH + credential.authMethod,
        GOOGLE_SERVICE
      );
    }
    if (!await compare(password, credential.password)) {
      throw new ErrorHandler(
        UNAUTHORIZED,
        authErrorMessages.PASSWORDS_NOT_MATCH,
        GOOGLE_SERVICE
      );
    }

    const { user } = credential;

    if (user.isBlocked) {
      throw new ErrorHandler(
        UNAUTHORIZED,
        authErrorMessages.USER_BLOCKED,
        GOOGLE_SERVICE
      );
    }

    const accessToken = createToken({}, secret.accessToken, '15m');
    const refreshToken = createToken({}, secret.refreshToken, '1d');

    await authTokenRepository.create({ accessToken, refreshToken, userId: user.id });

    return {
      accessToken: `Bearer ${accessToken}`,
      refreshToken };
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.controller);
  }
};

export const activate = async ({ id }) => {
  try {
    const userIsActivated = await userRepository.updateById(id, { isActivated: true });

    if (!userIsActivated) {
      throw new ErrorHandler(
        UNAUTHORIZED,
        authErrorMessages.USER_NOT_ACTIVATED,
        ACTIVATE_SERVICE
      );
    }

    return authSuccessMessage.USER_ACTIVATED;
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.controller);
  }
};

