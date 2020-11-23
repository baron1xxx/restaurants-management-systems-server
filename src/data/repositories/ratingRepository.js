import BaseRepository from './baseRepository';
import { RatingModel } from '../models';

export class RatingRepository extends BaseRepository {
  findOrCreate(findObj, data) {
    return this.model.findOrCreate({
      where: findObj,
      defaults: data
    });
  }
}
export default new RatingRepository(RatingModel);
