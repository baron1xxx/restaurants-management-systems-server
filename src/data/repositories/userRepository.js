import BaseRepository from './baseRepository';
import { CredentialModel, ImageModel, RoleModel, UserModel } from '../models/index';

class UserRepository extends BaseRepository {
  getById(id) {
    return this.model.findByPk(id, {
      include: [
        {
          model: CredentialModel
        },
        {
          model: ImageModel,
          attributes: ['id', 'link']
        },
        {
          model: RoleModel,
          attributes: ['id', 'role']
        }
      ]
    });
  }
}

export default new UserRepository(UserModel);
