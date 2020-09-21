import BaseRepository from './baseRepository';
import {
  RestaurantModel,
  GeolocationModel,
  AddressModel,
  RegionModel,
  CityModel,
  StreetModel,
  HouseNumberModel,
  OpeningModel,
  ImageModel
} from '../models/index';
import { LIMIT, OFFSET } from '../../constants/paginationConstants';

const include = [
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
  },
  {
    model: ImageModel,
    attributes: ['id', 'link']
  }
];

class RestaurantRepository extends BaseRepository {
  getById(id) {
    return this.model.findByPk(id, {
      include
    });
  }

  getAll(limit = LIMIT, offset = OFFSET) {
    return this.model.findAll({
      include,
      limit,
      offset
    });
  }

  countAll() {
    return this.model.count();
  }
}

export default new RestaurantRepository(RestaurantModel);
