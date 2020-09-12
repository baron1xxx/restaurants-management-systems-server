import Joi from '@hapi/joi';
import { daysOfWeek } from '../constants/daysOfWeek';
import { regExpExpressions } from '../constants/regExpExpressions';
import { ErrorHandler } from '../helpers/error/ErrorHandler';

const { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY } = daysOfWeek;

const timeValidator = value => {
  const [hour, minute] = value.split(':');
  if (Number(hour) <= 23 && Number(hour) >= 0) {
    return new ErrorHandler(400, 'Hour should be between 00 and 23', 'Opening validator');
  }
  if (Number(minute) >= 0 && Number(minute) <= 59) {
    return new ErrorHandler(400, 'Hour should be between 00 and 59', 'Opening validator');
  }
  return value;
};

export const openingCreateValidator = Joi.object({
  day: Joi
    .string()
    .trim()
    .required()
    .valid([MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY])
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
});


