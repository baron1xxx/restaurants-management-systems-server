import BaseRepository from './baseRepository';
import { AuthTokenModel } from '../models';

class AuthTokenRepository extends BaseRepository {

}

export default new AuthTokenRepository(AuthTokenModel);
