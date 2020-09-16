import Joi from '@hapi/joi';
import { daysOfWeek } from '../constants/daysOfWeek';
import { regExpExpressions } from '../constants/regExpExpressions';
// import { ErrorHandler } from '../helpers/error/ErrorHandler';

const { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY } = daysOfWeek;

const timeValidator = (value, helpers) => {
  const [hour, minute] = value.split(':');
  console.log('***********************');
  console.log(Number(hour), ' - ', Number(minute));
  console.log((Number(hour) < 0 || Number(hour) > 23));
  console.log((Number(minute) < 0 || Number(minute) > 59));
  console.log('***********************');
  if (Number(hour) < 0 || Number(hour) > 23) {
    console.log('99999999999999999999999');
    return helpers.error('any.invalid');
  }
  if (Number(minute) < 0 || Number(minute) > 59) {
    console.log('8888888888888888');
    return helpers.error('any.invalid');
  }
  return value;
};

export const openingCreateValidator = Joi.array().items(
  Joi.object({
    day: Joi
      .string()
      .trim()
      .required()
      .valid(MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY)
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
        'string.pattern.base': 'Start time does not match pattern.',
        'any.invalid': 'Mast be between 00-23'
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
