import Joi from '@hapi/joi';
import { regExpExpressions } from '../constants/regExpExpressions';

const { NAME } = regExpExpressions;

export const menuCreateValidator = Joi.object({
  name: Joi
    .string()
    .trim()
    .required()
    .min(3)
    .max(50)
    .regex(RegExp(NAME))
    .messages({
      'string.base': 'Menu name must be string',
      'string.required': 'Menu name is required',
      'string.min': 'Menu name minimum {#limit} symbol ',
      'string.max': 'Menu name maximum {#limit} symbol ',
      'string.pattern.base': 'Menu name does not match pattern.'
    }),
  restaurantId: Joi
    .number()
    .required()
    .integer()
    .positive()
});

export const menuUpdateValidator = Joi.object({
  name: Joi
    .string()
    .trim()
    .min(3)
    .max(50)
    .regex(RegExp(NAME))
    .messages({
      'string.base': 'Menu name must be string',
      'string.min': 'Menu name minimum {#limit} symbol ',
      'string.max': 'Menu name maximum {#limit} symbol ',
      'string.pattern.base': 'Menu name does not match pattern.'
    })
  // restaurantId: Joi
  //   .number()
  //   .required()
  //   .integer()
  //   .positive()
});
