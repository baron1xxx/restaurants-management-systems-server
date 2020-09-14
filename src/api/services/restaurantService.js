import * as googleMapsService from './googleMapsService';
import * as geolocationService from './geolocationService';
import * as addressService from './addressService';
import * as openingService from './openingService';
import restaurantRepository from '../../data/repositories/restaurantRepository';
import { addressObjToString } from '../../helpers/addressObjToString';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';

export const create = async (address, restaurantData, opening, userId) => {
  try {
    const { id } = await addressService.create(address);
    const createdAddress = await addressService.getById(id);

    const {
      lat: latitude,
      lng: longitude } = await googleMapsService
      .geolocationByAddress(
        addressObjToString(createdAddress)
      );

    const { id: geolocationId } = await geolocationService.create(
      {
        longitude,
        latitude }
    );

    const { id: restaurantId } = await restaurantRepository.create({
      ...restaurantData,
      userId,
      geolocationId,
      addressId: createdAddress.id
    });

    await openingService.create(opening, restaurantId);

    return restaurantRepository.getById(restaurantId);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.message);
  }
};
export const getById = async id => {
  try {
    return await restaurantRepository.getById(id);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Restaurant service create()');
  }
};
