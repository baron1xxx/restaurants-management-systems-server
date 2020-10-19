import Sequelize from 'sequelize';
import BaseRepository from './baseRepository';
import { DishModel } from '../models/index';

// eslint-disable-next-line no-unused-vars
const { Op } = Sequelize;

//
// const getWhere = filter => {
//   const {
//     restaurantId,
//     name
//   } = filter;
//
//   const where = {
//     isDeleted: false
//   };
//
//   if (restaurantId) Object.assign(where, { restaurantId });
//   if (name) {
//     Object.assign(where, { name: {
//       [Op.like]: `%${name}%`
//     } });
//   }
//   return where;
// };

class DishRepository extends BaseRepository {

}
export default new DishRepository(DishModel);
