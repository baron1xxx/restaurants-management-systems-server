import addressRepository from '../../data/repositories/addressRepository';
import regionRepository from '../../data/repositories/regionRepository';
import cityRepository from '../../data/repositories/cityRepository';
import streetRepository from '../../data/repositories/streetRepository';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';

export const create = async data => {
  try {
    return await addressRepository.create(data);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.controller);
  }
};

export const getById = async id => {
  try {
    return await addressRepository.getById(id);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.controller);
  }
};

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

export const getStreetsByCityIdByName = async (cityId, street) => {
  try {
    return await streetRepository.getAllByCityIdByName(cityId, street);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.controller);
  }
};
