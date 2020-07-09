import BaseRepository from './baseRepository';
import { UserModel } from '../models/index';

class UserRepository extends BaseRepository {

}

export default new UserRepository(UserModel);
