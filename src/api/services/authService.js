import userRepository from '../../data/repositories/userRepository';
import roleRepository from '../../data/repositories/roleRepository';
import credentialRepository from '../../data/repositories/credentialRepository';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';
import { encrypt } from '../../helpers/cryptoHelper';
import { createToken } from '../../helpers/tokenHelper';
import { emailTransporter } from '../../helpers/emailTransporter';
import { authErrorMessages } from '../../constants/customErrorMessage/authErrorMessage';
import { UNAUTHORIZED } from '../../constants/responseStatusCodes';
import { REGISTER_CONTROLLER } from '../../constants/controllerName/authControllerName';
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

