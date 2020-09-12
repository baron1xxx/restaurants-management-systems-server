import * as googleMapsService from '../services/googleMapsService';
import * as restaurantService from '../services/restaurantService';
import * as geolocationService from '../services/geolocationService';
import * as openingService from '../services/openingService';
import { addressObjToString } from '../../helpers/addressObjToString';
import { ErrorHandler } from '../../helpers/error/ErrorHandler';

export const create = async (req, res, next) => {
  try {
    const {
      address,
      restaurant: restaurantData,
      user: { id: userId }
    } = req;

    const { lat: latitude, lng: longitude } = await googleMapsService
      .geolocationByAddress(addressObjToString(address));

    const { id: geolocationId } = await geolocationService.create({ longitude, latitude });

    const { id } = await restaurantService.create({
      ...restaurantData,
      userId,
      geolocationId,
      addressId: address.id });

    await openingService.create(req.body.opening, id);

    const restaurant = await restaurantService.getById(id);

    res.status(200)
      .json({
        error: false,
        data: restaurant
      });
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
