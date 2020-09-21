import Joi from '@hapi/joi';

export const paginationValidator = Joi.object({
  limit: Joi
    .number()
    .integer()
    .positive(),
  page: Joi
    .number()
    .integer()
    .positive()
});
