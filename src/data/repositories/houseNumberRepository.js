import BaseRepository from './baseRepository';
import { HouseNumberModel } from '../models/index';

class HouseNumberRepository extends BaseRepository {
  findOrCreate(findObj, data) {
    return this.findOrCreate({
      where: findObj,
      defaults: data
    });
  }
}

export default new HouseNumberRepository(HouseNumberModel);
