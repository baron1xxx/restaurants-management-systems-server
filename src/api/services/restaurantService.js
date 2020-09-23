import * as googleMapsService from './googleMapsService';
import * as geolocationService from './geolocationService';
import * as addressService from './addressService';
import * as openingService from './openingService';
import * as imageService from './imageService';
import restaurantRepository from '../../data/repositories/restaurantRepository';
import { addressObjToString } from '../../helpers/addressObjToString';
import { countPages, offset } from '../../helpers/paginationHelper';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';
import { LIMIT, PAGE } from '../../constants/paginationConstants';

export const create = async (address, restaurantData, opening, file, userId) => {
  try {
    const { id } = await addressService.create(address);
    const createdAddress = await addressService.getById(id);

    const {
      lat: latitude,
      lng: longitude
    } = await googleMapsService.geolocationByAddress(addressObjToString(createdAddress));

    const { id: geolocationId } = await geolocationService.create({
      longitude,
      latitude
    });

    const { id: imageId } = await imageService.upload(file);

    const { id: restaurantId } = await restaurantRepository.create({
      ...restaurantData,
      userId,
      geolocationId,
      imageId,
      addressId: createdAddress.id
    });

    await openingService.create(opening, restaurantId);

    return restaurantRepository.getById(restaurantId);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.message);
  }
};

export const getRestaurants = async filter => {
  try {
    const { limit = LIMIT, page = PAGE } = filter;
    const restaurantsCount = await restaurantRepository.countAll();

    return {
      restaurants: await restaurantRepository.getAll({
        ...filter,
        offset: offset(page, limit) }),
      totalPage: countPages(restaurantsCount, limit)
    };
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Restaurant service geAll()');
  }
};

export const getById = async id => {
  try {
    return await restaurantRepository.getById(id);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Restaurant service getById()');
  }
};
