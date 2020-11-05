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
// import { restaurantSuccessMessage } from '../../constants/customSuccessMessage/restaurantSuccessMessage';
// eslint-disable-next-line no-unused-vars
import { BEAD_REQUEST, NOT_FOUND, UNAUTHORIZED } from '../../constants/responseStatusCodes';

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
    const restaurantsCount = await restaurantRepository.countAll(filter);

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

export const update = async (id, data) => {
  try {
    const { file, user, ...restaurantBody } = data;
    const restaurant = await getById(id);
    // if (restaurant.userId !== user.id) {
    //   throw new ErrorHandler(
    //     UNAUTHORIZED,
    //     restaurantErrorMessages.OWNER_OR_ADMIN_CAN_UPDATE_RESTAURANT,
    //     'Restaurant update() getById()'
    //   );
    // }
    // TODO перевыіряти на уныкальність імені при оновлені даних. Вдрух таке вже існує!!! Add Middleware!!!
    // TODO Може нанедо тої функції. Што складно читати!!!
    const restaurantUpdate = async (restaurantId, restaurantData) => {
      const restaurantIsUpdated = await restaurantRepository.updateById(restaurantId, restaurantData);
      if (!restaurantIsUpdated) {
        throw new ErrorHandler(
          BEAD_REQUEST,
          restaurantErrorMessages.RESTAURANT_NOT_UPDATED,
          'Restaurant updateById()'
        );
      }
      // eslint-disable-next-line no-return-await
      return await getById(restaurantId);
    };

    if (file) {
      const { id: imageId, deleteHash } = await imageService.getById(restaurant.image.id);
      await imageService.update(imageId, deleteHash, file);
      return await getById(id);
    }

    return await restaurantUpdate(id, restaurantBody);
  } catch (e) {
    throw new ErrorHandler(e.status, e.message, 'Restaurant service update()');
  }
};

// export const remove = async (id, user) => {
//   try {
//     const restaurant = await getById(id);
//     if (restaurant.userId !== user.id) {
//       throw new ErrorHandler(
//         UNAUTHORIZED,
//         restaurantErrorMessages.OWNER_OR_ADMIN_CAN_UPDATE_RESTAURANT,
//         'Restaurant remove() getById()'
//       );
//     }
//     const restaurantDeleted = await restaurantRepository.updateById(find, { isDeleted: true });
//     if (!restaurantDeleted) {
//       throw new ErrorHandler(
//         NOT_FOUND,
//         restaurantErrorMessages.RESTAURANT_NOT_FOUND,
//         'Restaurant delete()'
//       );
//     }
//     return restaurantSuccessMessage.RESTAURANT_SUCCESS_DELETED;
//   } catch (e) {
//     throw new ErrorHandler(e.status, e.message, e.controller);
//   }
// };
