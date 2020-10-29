import Joi from '@hapi/joi';
import { regExpExpressions } from '../constants/regExpExpressions';

const { NAME } = regExpExpressions;

export const dishCreateValidator = Joi.object({
  name: Joi
    .string()
    .trim()
    .required()
    .min(3)
    .max(50)
    .regex(RegExp(NAME))
    .messages({
      'string.base': 'Dish name must be string',
      'string.required': 'Dish name is required',
      'string.min': 'Dish name minimum {#limit} symbol ',
      'string.max': 'Dish name maximum {#limit} symbol ',
      'string.pattern.base': 'Dish name does not match pattern.'
    }),
  description: Joi
    .string()
    .trim()
    .required()
    .min(10)
    .max(200)
    .regex(RegExp(NAME))
    .messages({
      'string.base': 'Dish name must be string',
      'string.required': 'Dish name is required',
      'string.min': 'Dish name minimum {#limit} symbol ',
      'string.max': 'Dish name maximum {#limit} symbol ',
      'string.pattern.base': 'Dish name does not match pattern.'
    }),
  price: Joi
    .number()
    .required()
    .positive(),
  menuId: Joi
    .number()
    .required()
    .integer()
    .positive()
});

export const dishUpdateValidator = Joi.object({
  name: Joi
    .string()
    .trim()
    .min(3)
    .max(50)
    .regex(RegExp(NAME))
    .messages({
      'string.base': 'Dish name must be string',
      'string.min': 'Dish name minimum {#limit} symbol ',
      'string.max': 'Dish name maximum {#limit} symbol ',
      'string.pattern.base': 'Dish name does not match pattern.'
    }),
  description: Joi
    .string()
    .trim()
    .min(10)
    .max(200)
    .regex(RegExp(NAME))
    .messages({
      'string.base': 'Dish description must be string',
      'string.required': 'Dish description is required',
      'string.min': 'Dish description minimum {#limit} symbol ',
      'string.max': 'Dish description maximum {#limit} symbol ',
      'string.pattern.base': 'Dish description does not match pattern.'
    }),
  price: Joi
    .number()
    .positive(),
  menuId: Joi
    .number()
    .required()
    .integer()
    .positive()
});
