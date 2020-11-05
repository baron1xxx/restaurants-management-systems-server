import * as restaurantService from '../../services/restaurantService';
import menuRepository from '../../../data/repositories/menuRepository';
import { ErrorHandler } from '../../../helpers/error/ErrorHandler';
import { menuErrorMessages } from '../../../constants/customErrorMessage/menuErrorMessage';
import { BEAD_REQUEST } from '../../../constants/responseStatusCodes';

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  try {
    const { body: { name, restaurantId } } = req;
    // Check if restaurant exists.
    console.log('-----------------------------------');
    console.log(restaurantId);
    console.log('-----------------------------------');
    await restaurantService.getById(restaurantId);
    // TODO Якщо є імя то перевіряти на унікальність!!! if (name) {ПЕРЕВІРИТИ}
    const menuExists = name
      ? await menuRepository.getOne({ name, restaurantId })
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
