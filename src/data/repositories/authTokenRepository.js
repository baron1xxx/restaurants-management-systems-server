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

  deleteByAccessToken(accessToken) {
    return this.model.destroy({
      where: {
        accessToken
      }
    });
  }
}

export default new AuthTokenRepository(AuthTokenModel);
