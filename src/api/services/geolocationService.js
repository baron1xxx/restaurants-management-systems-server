import geolocationRepository from '../../data/repositories/geolocationRepository';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';

export const create = async data => {
  try {
    return await geolocationRepository.create(data);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Geolocation service create()');
  }
};
