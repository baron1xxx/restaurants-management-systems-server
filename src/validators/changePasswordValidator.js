import Joi from '@hapi/joi';
import { regExpExpressions } from '../constants/regExpExpressions';

const { PASSWORD } = regExpExpressions;

export const changePasswordValidator = Joi.object({
  password: Joi
    .string()
    .trim()
    .required()
    .regex(RegExp(PASSWORD))
    .messages({
      'string.base': 'Password must be string',
      'string.required': 'Password is required',
      'string.pattern.base': 'Does not match pattern. '
          + '            At least one capital English letter!\n'
          + '            At least one lowercase english letter!\n'
          + '            At least one digit!\n'
          + '            At least one special character!\n'
          + '            At least 8 in length!'
    }),
  passwordConfirm: Joi
    .string()
    .equal(Joi.ref('password'))
    .required()
    .messages({
      'string.base': 'Confirmation password must be string',
      'string.required': 'Confirmation password is required',
      'any.only': 'Confirmation password not equals password.'
    })
});
