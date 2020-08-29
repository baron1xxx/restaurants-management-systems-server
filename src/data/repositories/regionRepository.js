import Sequelize from 'sequelize';
import BaseRepository from './baseRepository';
import { RegionModel } from '../models/index';

const { Op } = Sequelize;

class RegionRepository extends BaseRepository {
  getAllByName(name) {
    return this.model.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    });
  }
}

export default new RegionRepository(RegionModel);
