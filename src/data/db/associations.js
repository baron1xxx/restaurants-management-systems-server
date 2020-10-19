
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
    Address,
    Geolocation,
    Restaurant,
    Opening,
    Menu
  } = models;

  User.hasMany(AuthToken);
  User.hasOne(Credential);
  User.hasMany(Restaurant);
  User.belongsTo(Role);
  User.belongsTo(Image);

  Credential.belongsTo(User);

  AuthToken.belongsTo(User);

  Role.hasOne(User);

  Image.hasOne(User);
  Image.hasOne(Restaurant);
  // Image.hasOne(Menu);

  Region.hasMany(City);
  Region.hasMany(Address);

  City.hasMany(Street);
  City.belongsTo(Region);

  Street.hasMany(HouseNumber);
  Street.belongsTo(City);

  HouseNumber.belongsTo(Street);

  Address.belongsTo(Region);
  Address.belongsTo(City);
  Address.belongsTo(Street);
  Address.belongsTo(HouseNumber);
  Address.hasOne(Restaurant);

  Restaurant.belongsTo(User);
  Restaurant.belongsTo(Address);
  Restaurant.belongsTo(Geolocation);
  Restaurant.belongsTo(Image);
  Restaurant.hasMany(Opening);
  Restaurant.hasMany(Menu);

  Geolocation.hasOne(Restaurant);

  Opening.belongsTo(Restaurant);

  Menu.belongsTo(Restaurant);
  Menu.belongsTo(Image);
};
