import restaurantRepository from '../../../data/repositories/restaurantRepository';
import { ErrorHandler } from '../../../helpers/error/ErrorHandler';
import { BEAD_REQUEST } from '../../../constants/responseStatusCodes';
import { restaurantErrorMessages } from '../../../constants/customErrorMessage/restaurantErrorMessage';

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  try {
    const { restaurant: { name } } = req;
    // If {name} check if this restaurant name exists
    const restaurantExists = name
      ? await restaurantRepository.getOne({ name })
      : null;

    return restaurantExists
      ? next(new ErrorHandler(
        BEAD_REQUEST,
        restaurantErrorMessages.RESTAURANT_EXISTS,
        'Check if restaurant name exists middleware'
      ))
      : next();
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
