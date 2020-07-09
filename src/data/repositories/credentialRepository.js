import BaseRepository from './baseRepository';
import { CredentialModel } from '../models';

class CredentialRepository extends BaseRepository {
  getByEmail(email) {
    return this.getOne({ email });
  }
}

export default new CredentialRepository(CredentialModel);
