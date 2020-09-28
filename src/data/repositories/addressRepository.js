import BaseRepository from './baseRepository';
import { AddressModel, RegionModel, CityModel, StreetModel, HouseNumberModel } from '../models/index';

class AddressRepository extends BaseRepository {
  create(data) {
    return this.model.create(data);
  }

  getById(id) {
    return this.model.findByPk(id, {
      include: [
        {
          model: RegionModel
        },
        {
          model: CityModel
        },
        {
          model: StreetModel
        },
        {
          model: HouseNumberModel
        }
      ]
    });
  }
}

export default new AddressRepository(AddressModel);
