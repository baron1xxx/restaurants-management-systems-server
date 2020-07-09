import BaseRepository from './baseRepository';
import { RoleModel } from '../models';

class RoleRepository extends BaseRepository {
  getByName(role) {
    return this.model.findOne(
      { where: { role },
        attributes: ['id'] }
    );
  }
}

export default new RoleRepository(RoleModel);
