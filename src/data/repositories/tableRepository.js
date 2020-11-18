import Sequelize from 'sequelize';
import BaseRepository from './baseRepository';
import { RestaurantModel, TableModel } from '../models';

const { Op } = Sequelize;

const include = [
  {
    model: RestaurantModel,
    attributes: ['id', 'userId']
  }
];

const getWhere = filter => {
  const {
    restaurantId,
    number
  } = filter;

  const where = {
    isDeleted: false
  };

  if (restaurantId) Object.assign(where, { restaurantId });
  if (number) {
    Object.assign(where, { number: {
      [Op.like]: `%${number}%`
    } });
  }
  return where;
};

class TableRepository extends BaseRepository {
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
      limit,
      offset
    });
  }

  countAll(filter) {
    const where = getWhere(filter);
    return this.model.count({ where });
  }
}

export default new TableRepository(TableModel);
