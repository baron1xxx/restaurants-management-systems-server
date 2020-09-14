import BaseRepository from './baseRepository';
import { OpeningModel } from '../models/index';

class OpeningRepository extends BaseRepository {
  addOpening(data, restaurantId) {
    return Promise.all(data
      .map(item => this.create({ ...item, restaurantId })));
  }
}
export default new OpeningRepository(OpeningModel);
