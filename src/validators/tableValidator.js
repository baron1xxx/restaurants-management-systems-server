import Joi from '@hapi/joi';

export const createTableValidator = Joi.object({
  number: Joi
    .number()
    .required()
    .integer()
    .positive(),
  restaurantId: Joi
    .number()
    .required()
    .integer()
    .positive()
});

export const updateTableValidator = Joi.object({
  number: Joi
    .number()
    .integer()
    .positive(),
  restaurantId: Joi
    .number()
    .required()
    .integer()
    .positive()
});
