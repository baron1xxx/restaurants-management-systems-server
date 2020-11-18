import Joi from '@hapi/joi';
import { daysOfWeek } from '../constants/daysOfWeek';
import { regExpExpressions } from '../constants/regExpExpressions';

const { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY } = daysOfWeek;

const timeValidator = (value, helpers) => {
  const [hour, minute] = value.split(':');

  if (Number(hour) < 0 || Number(hour) > 23) {
    return helpers.message('Hour should be between 00-23');
  }
  if (Number(minute) < 0 || Number(minute) > 59) {
    return helpers.message('Minute should be between 00-59');
  }
  return value;
};

export const openingCreateValidator = Joi.array().items(
  Joi.object({
    day: Joi
      .string()
      .trim()
      .required()
      .valid(MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY) // TODO Дні не повинні повторюватись!!!
      .messages({
        'string.base': 'Day must be string',
        'string.required': 'Day is required'
      }),
    start: Joi
      .string()
      .trim()
      .required()
      .regex(RegExp(regExpExpressions.TIME))
      .custom(timeValidator, 'Custom time validator')
      .messages({
        'string.base': 'Start time must be string',
        'string.required': 'Start time is required',
        'string.pattern.base': 'Start time does not match pattern.'
      }),
    end: Joi
      .string()
      .trim()
      .required()
      .regex(RegExp(regExpExpressions.TIME))
      .custom(timeValidator, 'Custom time validator')
      .messages({
        'string.base': 'End time must be string',
        'string.required': 'End time is required',
        'string.pattern.base': 'End time does not match pattern.'
      })
  })
);
