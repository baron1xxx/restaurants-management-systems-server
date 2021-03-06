import dishRepository from '../../../data/repositories/dishRepository';
import { ErrorHandler } from '../../../helpers/error/ErrorHandler';
import { dishErrorMessages } from '../../../constants/customErrorMessage/dishErrorMessage';
import { BEAD_REQUEST } from '../../../constants/responseStatusCodes';

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  try {
    const { body: { name, menuId } } = req;

    const dishExists = name
      ? await dishRepository.getOne({ name, menuId: menuId || req.menuId })
      : null;

    return !dishExists
      ? next()
      : next(new ErrorHandler(
        BEAD_REQUEST,
        dishErrorMessages.DISH_EXISTS,
        'Check if dish exists by name middleware'
      ));
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
