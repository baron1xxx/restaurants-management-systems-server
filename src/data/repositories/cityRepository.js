import Sequelize from 'sequelize';
import BaseRepository from './baseRepository';
import { CityModel } from '../models/index';

const { Op } = Sequelize;

class CityRepository extends BaseRepository {
  getAllByRegionIdByName(regionId, city) {
    return this.model.findAll({
      where: {
        name: {
          [Op.like]: `%${city}%`
        },
        regionId
      }
    });
  }
}

export default new CityRepository(CityModel);
