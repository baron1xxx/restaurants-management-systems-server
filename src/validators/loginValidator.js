import Joi from '@hapi/joi';
import { LOCAL, GOOGLE, FACEBOOK } from '../constants/authMethods';
import { regExpExpressions } from '../constants/regExpExpressions';

const { PASSWORD } = regExpExpressions;

export const loginValidator = Joi.object({
  email: Joi
    .string()
    .trim()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'string.base': 'Email must be string',
      'string.required': 'Email is required',
      'string.email': 'Email must bea valid'
    }),
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
  authMethod: Joi
    .string()
    .trim()
    .required()
    .valid(LOCAL, GOOGLE, FACEBOOK)
    .messages({
      'string.required': 'Auth method is required'
    })
});
