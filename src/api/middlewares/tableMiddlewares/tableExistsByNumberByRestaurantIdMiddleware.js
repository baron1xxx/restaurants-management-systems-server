// eslint-disable-next-line no-unused-vars
import * as restaurantService from '../../services/restaurantService';
import tableRepository from '../../../data/repositories/tableRepository';
import { ErrorHandler } from '../../../helpers/error/ErrorHandler';
import { tableErrorMessages } from '../../../constants/customErrorMessage/tableErrorMessage';
import { BEAD_REQUEST } from '../../../constants/responseStatusCodes';

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  try {
    const { body: { number, restaurantId } } = req;

    // Check if restaurant exists.
    await restaurantService.getById(restaurantId);

    const tableExists = number
      ? await tableRepository.getOne({ number, restaurantId })
      : null;

    return !tableExists
      ? next()
      : next(new ErrorHandler(
        BEAD_REQUEST,
        tableErrorMessages.TABLE_EXISTS,
        'Check if table exists by name middleware'
      ));
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
