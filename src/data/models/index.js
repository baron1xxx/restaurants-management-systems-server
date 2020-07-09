import orm from '../db/connection';
import associate from '../db/associations';

const User = orm.import('./user');
const Image = orm.import('./image');
const AuthToken = orm.import('./authToken');
const Credential = orm.import('./credential');
const Role = orm.import('./role');

associate({
  User,
  Image,
  AuthToken,
  Credential,
  Role
});

export {
  User as UserModel,
  Image as ImageModel,
  AuthToken as AuthTokenModel,
  Credential as CredentialModel,
  Role as RoleModel
};
