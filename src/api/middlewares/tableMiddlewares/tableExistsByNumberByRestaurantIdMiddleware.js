import tableRepository from '../../../data/repositories/tableRepository';
import { ErrorHandler } from '../../../helpers/error/ErrorHandler';
import { tableErrorMessages } from '../../../constants/customErrorMessage/tableErrorMessage';
import { BEAD_REQUEST } from '../../../constants/responseStatusCodes';

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  try {
    const { body: { number, restaurantId } } = req;

    const tableExists = number
      ? await tableRepository.getOne({ number, restaurantId: restaurantId || req.restaurantId })
      : null;

    return tableExists
      ? next(new ErrorHandler(
        BEAD_REQUEST,
        tableErrorMessages.TABLE_EXISTS,
        'Check if table exists by name middleware'
      ))
      : next();
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
