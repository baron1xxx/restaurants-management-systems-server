import openingRepository from '../../data/repositories/openingRepository';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';

export const create = async (data, restaurantId) => {
  try {
    return await openingRepository.addOpening(data, restaurantId);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Opening service create()');
  }
};
