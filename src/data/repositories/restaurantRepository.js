import Sequelize from 'sequelize';
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

const { Op } = Sequelize;

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

const getWhere = filter => {
  const {
    userId,
    name
  } = filter;
  const where = {
    isDeleted: false
  };
  if (userId) Object.assign(where, { userId });
  if (name) {
    Object.assign(where, { name: {
      [Op.like]: `%${name}%`
    } });
  }
  return where;
};

class RestaurantRepository extends BaseRepository {
  getById(id) {
    return this.model.findByPk(id, {
      include
    });
  }

  getAll(filter) {
    const {
      limit,
      offset
    } = filter;
    const where = getWhere(filter);

    return this.model.findAll({
      where,
      include,
      limit,
      offset
    });
  }

  countAll(filter) {
    const where = getWhere(filter);
    return this.model.count({ where });
  }
}

export default new RestaurantRepository(RestaurantModel);
