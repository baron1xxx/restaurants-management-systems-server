import regionRepository from '../../../data/repositories/regionRepository';
import cityRepository from '../../../data/repositories/cityRepository';
import streetRepository from '../../../data/repositories/streetRepository';
import houseNumberRepository from '../../../data/repositories/houseNumberRepository';
import addressRepository from '../../../data/repositories/addressRepository';
import { addressErrorMessages } from '../../../constants/customErrorMessage/addressErrorMessage';
import { addressControllerName } from '../../../constants/controllerName/addressControllerName';
import { NOT_FOUND, BEAD_REQUEST } from '../../../constants/responseStatusCodes';

export default async (req, res, next) => {
  try {
    const { regionId, cityId, streetId, houseNumber } = req.body;
    // Check Region
    const region = await regionRepository.getById(regionId);
    if (!region) {
      next({
        status: NOT_FOUND,
        message: addressErrorMessages.REGION_NOT_EXISTS,
        controller: addressControllerName.CHECK_ADDRESS_MIDDLEWARE });
    }
    // Check City by regionId
    const city = await cityRepository.getOne({ id: cityId, regionId });
    if (!city) {
      next({
        status: NOT_FOUND,
        message: addressErrorMessages.CITY_NOT_EXISTS,
        controller: addressControllerName.CHECK_ADDRESS_MIDDLEWARE });
    }
    // Check Street by cityId
    const street = await streetRepository.getOne({ id: streetId, cityId });
    if (!street) {
      next({
        status: NOT_FOUND,
        message: addressErrorMessages.STREET_NOT_EXISTS,
        controller: addressControllerName.CHECK_ADDRESS_MIDDLEWARE });
    }
    // Check HouseNumber by streetId
    const [createdHouseNumber] = await houseNumberRepository.findOrCreate({ number: houseNumber, cityId });
    if (createdHouseNumber) {
      next({
        status: BEAD_REQUEST,
        message: addressErrorMessages.ADDRESS_EXISTS,
        controller: addressControllerName.CHECK_ADDRESS_MIDDLEWARE });
    }

    const address = await addressRepository.create(
      {
        regionId,
        cityId,
        streetId,
        houseNumberId: createdHouseNumber.id }
    );

    req.address = address;
    next();
  } catch (e) {
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};
