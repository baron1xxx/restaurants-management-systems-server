import Sequelize from 'sequelize';
import BaseRepository from './baseRepository';
import { DishModel, ImageModel, MenuModel } from '../models/index';

// eslint-disable-next-line no-unused-vars
const { Op } = Sequelize;

const include = [
  {
    model: MenuModel,
    attributes: ['id', 'restaurantId']
  },
  {
    model: ImageModel,
    attributes: ['id', 'link']
  }
];

const getWhere = filter => {
  const {
    menuId,
    name
  } = filter;

  const where = {
    isDeleted: false
  };

  if (menuId) Object.assign(where, { menuId });
  if (name) {
    Object.assign(where, { name: {
      [Op.like]: `%${name}%`
    } });
  }
  return where;
};

class DishRepository extends BaseRepository {
  getById(id) {
    return this.model.findByPk(id, {
      include
    });
  }

  // TODO name filter don't work
  countAll(filter) {
    const where = getWhere(filter);
    return this.model.count({ where });
  }
}
export default new DishRepository(DishModel);
