import menuRepository from '../../../data/repositories/menuRepository';
import { ErrorHandler } from '../../../helpers/error/ErrorHandler';
import { menuErrorMessages } from '../../../constants/customErrorMessage/menuErrorMessage';
import { BEAD_REQUEST } from '../../../constants/responseStatusCodes';

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  try {
    // TODO По імені потрібно шукати в конкретному ресторані, а тому потрібен ресторанІД
    const { body: { name, restaurantId } } = req;

    const menuExists = name
      ? await menuRepository.getOne({ name, restaurantId: restaurantId || req.restaurantId })
      : null;

    return !menuExists
      ? next()
      : next(new ErrorHandler(
        BEAD_REQUEST,
        menuErrorMessages.MENU_EXISTS,
        'Check if menu exists by name middleware'
      ));
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
