import BaseRepository from './baseRepository';
import { CommentModel, RatingModel } from '../models/index';

const include = [
  {
    model: RatingModel,
    attributes: ['id', 'rating']
  }
];

const getWhere = filter => {
  const { restaurantId } = filter;

  const where = {
    isDeleted: false
  };

  if (restaurantId) Object.assign(where, { restaurantId });

  return where;
};

export class CommentRepository extends BaseRepository {
  getById(commentId) {
    return this.model.findByPk(commentId,
      {
        include
      });
  }

  getAll(filter) {
    const { limit, offset } = filter;

    return this.model.findAll({
      limit,
      offset,
      include
    });
  }

  countAll(filter) {
    const where = getWhere(filter);
    return this.model.count({ where });
  }
}
export default new CommentRepository(CommentModel);
