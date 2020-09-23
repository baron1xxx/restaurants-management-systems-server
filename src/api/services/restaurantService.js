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
import { restaurantErrorMessages } from '../../constants/customErrorMessage/restaurantErrorMessage';
import { restaurantSuccessMessage } from '../../constants/customSuccessMessage/restaurantSuccessMessage';
import { NOT_FOUND } from '../../constants/responseStatusCodes';

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
    throw new ErrorHandler(
      e.status,
      e.message,
      'Restaurant service create()'
    );
  }
};

export const getRestaurants = async filter => {
  try {
    const { limit = LIMIT, page = PAGE } = filter;
    console.log('**********************');
    console.log(filter);
    console.log('**********************');
    const restaurantsCount = await restaurantRepository.countAll(filter);
    console.log(restaurantsCount);

    return {
      restaurants: await restaurantRepository.getAll({
        ...filter,
        offset: offset(page, limit) }),
      totalPage: countPages(restaurantsCount, limit)
    };
  } catch (e) {
    throw new ErrorHandler(
      e.status,
      e.message,
      'Restaurant service geAll()'
    );
  }
};

export const getById = async id => {
  try {
    const restaurant = await restaurantRepository.getById(id);
    if (!restaurant) {
      throw new ErrorHandler(
        NOT_FOUND,
        restaurantErrorMessages.RESTAURANT_NOT_FOUND,
        'Restaurant getById()'
      );
    }
    return restaurant;
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Restaurant service getById()');
  }
};

export const update = async (find, data) => {
  try {
    const restaurantUpdated = await restaurantRepository.updateById(find, data);
    if (!restaurantUpdated) {
      throw new ErrorHandler(
        NOT_FOUND,
        restaurantErrorMessages.RESTAURANT_NOT_FOUND,
        'Restaurant update()'
      );
    }
    return restaurantSuccessMessage.RESTAURANT_SUCCESS_UPDATED;
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Restaurant service getById()');
  }
};

export const remove = async find => {
  try {
    const restaurantDeleted = await restaurantRepository.updateById(find, { isDeleted: true });
    if (!restaurantDeleted) {
      throw new ErrorHandler(
        NOT_FOUND,
        restaurantErrorMessages.RESTAURANT_NOT_FOUND,
        'Restaurant delete()'
      );
    }
    return restaurantSuccessMessage.RESTAURANT_SUCCESS_DELETED;
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, e.controller);
  }
};
