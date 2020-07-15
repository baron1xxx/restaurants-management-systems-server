import Joi from '@hapi/joi';

export const emailValidator = Joi.object({
  email: Joi
    .string()
    .trim()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'string.base': 'Email must be string',
      'string.required': 'Email is required',
      'string.email': 'Email must bea valid'
    })
});
