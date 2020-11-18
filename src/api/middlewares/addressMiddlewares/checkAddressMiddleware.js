import { ErrorHandler } from '../../../helpers/error/ErrorHandler';
import regionRepository from '../../../data/repositories/regionRepository';
import cityRepository from '../../../data/repositories/cityRepository';
import streetRepository from '../../../data/repositories/streetRepository';
import houseNumberRepository from '../../../data/repositories/houseNumberRepository';
import { addressErrorMessages } from '../../../constants/customErrorMessage/addressErrorMessage';
import { addressControllerName } from '../../../constants/controllerName/addressControllerName';
import { NOT_FOUND, BEAD_REQUEST } from '../../../constants/responseStatusCodes';

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  try {
    const {
      regionId,
      cityId,
      streetId,
      houseNumber } = req.body;
    // Check Region
    const region = await regionRepository.getById(regionId);
    if (!region) {
      return next(new ErrorHandler(
        NOT_FOUND,
        addressErrorMessages.REGION_NOT_EXISTS,
        addressControllerName.CHECK_ADDRESS_MIDDLEWARE
      ));
    }
    // Check City by regionId
    const city = await cityRepository.getOne({ id: cityId, regionId });
    if (!city) {
      return next(new ErrorHandler(
        NOT_FOUND,
        addressErrorMessages.CITY_NOT_EXISTS,
        addressControllerName.CHECK_ADDRESS_MIDDLEWARE
      ));
    }
    // Check Street by cityId
    const street = await streetRepository.getOne({ id: streetId, cityId });
    if (!street) {
      return next(new ErrorHandler(
        NOT_FOUND,
        addressErrorMessages.STREET_NOT_EXISTS,
        addressControllerName.CHECK_ADDRESS_MIDDLEWARE
      ));
    }

    // Check HouseNumber by streetId
    const houseNumberExists = await houseNumberRepository.getOne({ number: houseNumber, streetId });
    if (houseNumberExists) {
      return next(new ErrorHandler(
        BEAD_REQUEST,
        addressErrorMessages.ADDRESS_EXISTS,
        addressControllerName.CHECK_ADDRESS_MIDDLEWARE
      ));
    }

    req.address = {
      regionId,
      cityId,
      streetId,
      houseNumberId: houseNumber };
    next();
  } catch (e) {
    next(new ErrorHandler(e.status, e.message, e.controller));
  }
};
