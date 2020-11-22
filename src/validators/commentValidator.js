import Joi from '@hapi/joi';
import { regExpExpressions } from '../constants/regExpExpressions';

const { NAME } = regExpExpressions;

export const commentCreateValidator = Joi.object({
  body: Joi
    .string()
    .trim()
    .required()
    .min(3)
    .max(300)
    .regex(RegExp(NAME))
    .messages({
      'string.base': 'Comment body must be string',
      'string.required': 'Comment body is required',
      'string.min': 'Comment body minimum {#limit} symbol ',
      'string.max': 'Comment body maximum {#limit} symbol ',
      'string.pattern.base': 'Comment body does not match pattern.'
    }),
  rating: Joi
    .number()
    .required()
    .integer()
    .positive()
    .min(1)
    .max(5),
  restaurantId: Joi
    .number()
    .required()
    .integer()
    .positive()
});

export const commentUpdateValidator = Joi.object({
  body: Joi
    .string()
    .trim()
    .required()
    .min(3)
    .max(300)
    .regex(RegExp(NAME))
    .messages({
      'string.base': 'Comment body must be string',
      'string.required': 'Comment body is required',
      'string.min': 'Comment body minimum {#limit} symbol ',
      'string.max': 'Comment body maximum {#limit} symbol ',
      'string.pattern.base': 'Comment body does not match pattern.'
    }),
  rating: Joi
    .number()
    .required()
    .integer()
    .positive()
    .min(1)
    .max(5)
});
