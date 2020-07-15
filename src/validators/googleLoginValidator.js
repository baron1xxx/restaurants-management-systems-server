import Joi from '@hapi/joi';
import { GOOGLE } from '../constants/authMethods';
import { roles } from '../constants/roles';

const { CUSTOMER } = roles;

export const googleLoginValidator = Joi.object({
  firstName: Joi
    .string()
    .trim()
    .required()
    .messages({
      'string.base': 'Firs name must be string',
      'string.required': 'Firs name is required'
    }),
  lastName: Joi
    .string()
    .trim()
    .required()
    .messages({
      'string.base': 'Last name must be string',
      'string.required': 'Last name is required'
    }),
  email: Joi
    .string()
    .trim()
    .required()
    .email({ tlds: { allow: ['com'] } })
    .messages({
      'string.base': 'Email must be string',
      'string.required': 'Email is required',
      'string.email': 'Email must bea valid'
    }),
  password: Joi
    .string()
    .trim()
    .required()
    .messages({
      'string.base': 'Password must be string',
      'string.required': 'Password is required'
    }),
  imageUrl: Joi
    .string()
    .uri(),
  authMethod: Joi
    .string()
    .trim()
    .required()
    .valid(GOOGLE)
    .messages({
      'string.required': 'Auth method is required'
    }),
  role: Joi
    .string()
    .trim()
    .required()
    .valid(CUSTOMER)
    .messages({
      'string.required': 'Role is required'
    })
});
