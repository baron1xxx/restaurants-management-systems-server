import BaseRepository from './baseRepository';
import {
  RestaurantModel,
  GeolocationModel,
  AddressModel,
  RegionModel,
  CityModel,
  StreetModel,
  HouseNumberModel,
  OpeningModel
} from '../models/index';

class RestaurantRepository extends BaseRepository {
  getById(id) {
    return this.model.findByPk(id, {
      include: [
        {
          model: GeolocationModel,
          attributes: ['id', 'latitude', 'longitude']
        },
        {
          model: AddressModel,
          include: [
            {
              model: RegionModel,
              attributes: ['id', 'name']
            },
            {
              model: CityModel,
              attributes: ['id', 'name']
            },
            {
              model: StreetModel,
              attributes: ['id', 'name']
            },
            {
              model: HouseNumberModel,
              attributes: ['id', 'number']
            }
          ]
        },
        {
          model: OpeningModel,
          attributes: ['id', 'day', 'start', 'end']
        }
      ]
    });
  }
}

export default new RestaurantRepository(RestaurantModel);
