import regionRepository from '../../data/repositories/regionRepository';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';

export const getRegionsByName = async region => {
  try {
    return await regionRepository.getAllByName(region);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.controller);
  }
};
