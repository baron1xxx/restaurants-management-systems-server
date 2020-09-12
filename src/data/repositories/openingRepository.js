import BaseRepository from './baseRepository';
import { OpeningModel } from '../models/index';

class OpeningRepository extends BaseRepository {
  addOpening(data, restaurantId) {
    return Promise.all(Object.entries(data)
      .map(([day, value]) => this.create({ ...value, day, restaurantId })));
  }
}
export default new OpeningRepository(OpeningModel);
