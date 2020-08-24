import regionRepository from '../../data/repositories/regionRepository';
import cityRepository from '../../data/repositories/cityRepository';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';

export const getRegionsByName = async region => {
  try {
    return await regionRepository.getAllByName(region);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.controller);
  }
};

export const getCitiesByRegionIdByName = async (regionId, city) => {
  try {
    return await cityRepository.getAllByRegionIdByName(regionId, city);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.controller);
  }
};
