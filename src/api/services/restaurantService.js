import restaurantRepository from '../../data/repositories/restaurantRepository';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';

export const create = async data => {
  try {
    return await restaurantRepository.create(data);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Restaurant service create()');
  }
};
export const getById = async id => {
  try {
    return await restaurantRepository.getById(id);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Restaurant service getById()');
  }
};
