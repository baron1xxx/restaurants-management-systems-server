import BaseRepository from './baseRepository';
import { CredentialModel, UserModel } from '../models';

class CredentialRepository extends BaseRepository {
  getByEmail(email) {
    return this.model.findOne({
      where: { email },
      include: {
        model: UserModel
      }
    });
  }
}

export default new CredentialRepository(CredentialModel);
