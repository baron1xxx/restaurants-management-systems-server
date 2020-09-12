import BaseRepository from './baseRepository';
import { HouseNumberModel } from '../models/index';

class HouseNumberRepository extends BaseRepository {
  findOrCreate(number, streetId) {
    return this.model.findOrCreate({
      where: {
        number,
        streetId
      },
      defaults: {
        number,
        streetId
      }
    });
  }
}

export default new HouseNumberRepository(HouseNumberModel);
