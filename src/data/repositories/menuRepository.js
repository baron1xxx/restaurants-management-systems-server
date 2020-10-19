import Sequelize from 'sequelize';
import BaseRepository from './baseRepository';
import { MenuModel, ImageModel, RestaurantModel } from '../models/index';

const { Op } = Sequelize;

const include = [
  {
    model: RestaurantModel,
    attributes: ['id', 'userId']
  },
  {
    model: ImageModel,
    attributes: ['id', 'link']
  }
];

const getWhere = filter => {
  const {
    restaurantId,
    name
  } = filter;

  const where = {
    isDeleted: false
  };

  if (restaurantId) Object.assign(where, { restaurantId });
  if (name) {
    Object.assign(where, { name: {
      [Op.like]: `%${name}%`
    } });
  }
  return where;
};

class MenuRepository extends BaseRepository {
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
export default new MenuRepository(MenuModel);
