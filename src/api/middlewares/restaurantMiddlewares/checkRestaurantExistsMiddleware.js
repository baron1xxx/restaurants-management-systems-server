import restaurantRepository from '../../../data/repositories/restaurantRepository';
import { ErrorHandler } from '../../../helpers/error/ErrorHandler';
import { restaurantErrorMessages } from '../../../constants/customErrorMessage/restaurantErrorMessage';
import { BEAD_REQUEST } from '../../../constants/responseStatusCodes';

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  try {
    const { body: { name } } = req;
    const restaurantExists = await restaurantRepository.getOne({ name });
    if (restaurantExists) {
      return next(new ErrorHandler(
        BEAD_REQUEST,
        restaurantErrorMessages.RESTAURANT_EXISTS,
        'Check if restaurant exists middleware'

      ));
    }
    next();
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
