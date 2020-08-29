import Sequelize from 'sequelize';
import BaseRepository from './baseRepository';
import { StreetModel } from '../models/index';

const { Op } = Sequelize;

class StreetModelRepository extends BaseRepository {
  getAllByCityIdByName(cityId, street) {
    return this.model.findAll({
      where: {
        name: {
          [Op.like]: `%${street}%`
        },
        cityId
      }
    });
  }
}

export default new StreetModelRepository(StreetModel);
