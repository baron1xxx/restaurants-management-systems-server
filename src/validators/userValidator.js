import Joi from '@hapi/joi';
import { LOCAL } from '../constants/authMethods';
import { regExpExpressions } from '../constants/regExpExpressions';
import { roles } from '../constants/roles';

const { NAME, PASSWORD } = regExpExpressions;
const { ADMIN, MANAGER, OWNER, CUSTOMER, COOK, WAITER } = roles;

export const userCreateValidator = Joi.object({
  firstName: Joi
    .string().trim().required().min(3)
    .trim()
    .required()
    .max(20)
    .regex(RegExp(NAME))
    .messages({
      'string.base': 'Firs name must be string',
      'string.required': 'Firs name is required',
      'string.min': 'Firs name minimum {#limit} symbol ',
      'string.max': 'Firs name maximum {#limit} symbol ',
      'string.pattern.base': 'Does not match pattern.'
    }),
  lastName: Joi
    .string()
    .trim()
    .required()
    .min(3)
    .max(20)
    .regex(RegExp(NAME))
    .messages({
      'string.base': 'Last name must be string',
      'string.required': 'Last name is required',
      'string.min': 'Last name minimum {#limit} symbol ',
      'string.max': 'Last name maximum {#limit} symbol ',
      'string.pattern.base': 'Does not match pattern.'
    }),
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
    .valid(LOCAL)
    .messages({
      'string.required': 'Auth method is required'
    }),
  role: Joi
    .string()
    .trim()
    .required()
    .valid(ADMIN, MANAGER, OWNER, CUSTOMER, COOK, WAITER)
    .messages({
      'string.required': 'Role is required'
    })
});
