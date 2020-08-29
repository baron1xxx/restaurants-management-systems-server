import * as addressService from '../services/addressService';

export const getRegionsByName = async (req, res, next) => {
  try {
    const { region } = req.query;
    const regions = await addressService.getRegionsByName(region);
    res.status(200)
      .json({
        error: false,
        data: regions
      });
  } catch (e) {
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};

export const getCitiesByRegionIdByName = async (req, res, next) => {
  try {
    const { regionId, city } = req.query;
    const cities = await addressService.getCitiesByRegionIdByName(regionId, city);
    res.status(200)
      .json({
        error: false,
        data: cities
      });
  } catch (e) {
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};

export const getStreetsByCityIdByName = async (req, res, next) => {
  try {
    const { cityId, street } = req.query;
    const streets = await addressService.getStreetsByCityIdByName(cityId, street);
    res.status(200)
      .json({
        error: false,
        data: streets
      });
  } catch (e) {
    next({ status: e.status, message: e.message, controller: e.controller });
  }
};

