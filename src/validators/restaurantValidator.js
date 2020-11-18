import Joi from '@hapi/joi';
import { regExpExpressions } from '../constants/regExpExpressions';

const { NAME, TEL } = regExpExpressions;

export const restaurantCreateValidator = Joi.object({
  name: Joi
    .string()
    .trim()
    .required()
    .min(3)
    .max(50)
    .regex(RegExp(NAME))
    .messages({
      'string.base': 'Restaurant name must be string',
      'string.required': 'Restaurant name is required',
      'string.min': 'Restaurant name minimum {#limit} symbol ',
      'string.max': 'Restaurant name maximum {#limit} symbol ',
      'string.pattern.base': 'Restaurant name does not match pattern.'
    }),
  description: Joi
    .string()
    .trim()
    .required()
    .min(3)
    .max(200)
    .regex(RegExp(NAME))
    .messages({
      'string.base': 'Restaurant description must be string',
      'string.required': 'Restaurant description is required',
      'string.min': 'Restaurant description minimum {#limit} symbol ',
      'string.max': 'Restaurant description maximum {#limit} symbol ',
      'string.pattern.base': 'Restaurant description does not match pattern.'
    }),
  telephone: Joi
    .string()
    .trim()
    .required()
    .regex(RegExp(TEL))
    .messages({
      'string.base': 'Telephone must be string',
      'string.required': 'Telephone is required',
      'string.pattern.base': 'Telephone does not match pattern.'
    })
});
// TODO Переробити всі валідатори на Joi.object().keys({}), щоб не дозволити інших ключів крім тих, що в схемі валідації
export const restaurantUpdateValidator = Joi.object().keys({
  name: Joi
    .string()
    .trim()
    .min(3)
    .max(50)
    .regex(RegExp(NAME))
    .messages({
      'string.base': 'Restaurant name must be string',
      'string.required': 'Restaurant name is required',
      'string.min': 'Restaurant name minimum {#limit} symbol ',
      'string.max': 'Restaurant name maximum {#limit} symbol ',
      'string.pattern.base': 'Restaurant name does not match pattern.'
    }),
  description: Joi
    .string()
    .trim()
    .min(3)
    .max(200)
    .regex(RegExp(NAME))
    .messages({
      'string.base': 'Restaurant description must be string',
      'string.required': 'Restaurant description is required',
      'string.min': 'Restaurant description minimum {#limit} symbol ',
      'string.max': 'Restaurant description maximum {#limit} symbol ',
      'string.pattern.base': 'Restaurant description does not match pattern.'
    }),
  telephone: Joi
    .string()
    .trim()
    .regex(RegExp(TEL))
    .messages({
      'string.base': 'Telephone must be string',
      'string.required': 'Telephone is required',
      'string.pattern.base': 'Telephone does not match pattern.'
    })
});
