import orm from '../db/connection';
import associate from '../db/associations';
// Auth models
const User = orm.import('./user');
const Image = orm.import('./image');
const AuthToken = orm.import('./authToken');
const Credential = orm.import('./credential');
const Role = orm.import('./role');
// Address models
const Region = orm.import('./region');
const City = orm.import('./city');
const Street = orm.import('./street');
const HouseNumber = orm.import('./houseNumber');
const Address = orm.import('./address');
// Geolocation models
const Geolocation = orm.import('./geolocation');
// Geolocation models
const Opening = orm.import('./opening');
// Restaurant model
const Restaurant = orm.import('./restaurant');

associate({
  User,
  Image,
  AuthToken,
  Credential,
  Role,
  Region,
  City,
  Street,
  HouseNumber,
  Address,
  Restaurant,
  Geolocation,
  Opening
});

export {
  User as UserModel,
  Image as ImageModel,
  AuthToken as AuthTokenModel,
  Credential as CredentialModel,
  Role as RoleModel,
  Region as RegionModel,
  City as CityModel,
  Street as StreetModel,
  HouseNumber as HouseNumberModel,
  Address as AddressModel,
  Restaurant as RestaurantModel,
  Geolocation as GeolocationModel,
  Opening as OpeningModel
};
