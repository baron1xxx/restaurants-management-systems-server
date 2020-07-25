import BaseRepository from './baseRepository';
import { AuthTokenModel, UserModel } from '../models';

class AuthTokenRepository extends BaseRepository {
  getUserByAccessToken(accessToken) {
    return this.model.findOne({
      where: {
        accessToken
      },
      include: {
        model: UserModel
      }
    });
  }
}

export default new AuthTokenRepository(AuthTokenModel);
