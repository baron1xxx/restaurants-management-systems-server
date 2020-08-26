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
    HouseNumber
  } = models;

  User.hasOne(AuthToken);
  User.hasOne(Credential);
  User.belongsTo(Role);
  User.belongsTo(Image);

  Role.hasOne(User);

  Image.hasOne(User);

  Region.hasMany(City);

  City.hasMany(Street);
  City.belongsTo(Region);

  Street.hasMany(HouseNumber);
  Street.belongsTo(City);

  HouseNumber.belongsTo(Street);
};
