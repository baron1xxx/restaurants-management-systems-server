export default models => {
  const {
    User,
    Image,
    AuthToken,
    Credential,
    Role,
    Region,
    City,
    Street,
    HouseNumber,
    Address
  } = models;

  User.hasMany(AuthToken);
  User.hasOne(Credential);
  User.belongsTo(Role);
  User.belongsTo(Image);

  Credential.belongsTo(User);

  AuthToken.belongsTo(User);

  Role.hasOne(User);

  Image.hasOne(User);

  Region.hasMany(City);

  City.hasMany(Street);
  City.belongsTo(Region);

  Street.hasMany(HouseNumber);
  Street.belongsTo(City);

  HouseNumber.belongsTo(Street);

  Address.belongsTo(Region);
  Address.belongsTo(City);
  Address.belongsTo(Street);
  Address.belongsTo(HouseNumber);
};
